/* eslint-disable */

var path = require('path');
var webpack = require('webpack');
var writeStats = require('./utils/writeStats');
var notifyStats = require('./utils/notifyStats');
var opts = require('./utils/makeLoaders');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var assetsPath = path.resolve(__dirname, '../static/dist');
var host = 'localhost';
var port = parseInt(process.env.PORT) + 1 || 4001;

module.exports = {
  devtool: 'eval-source-map',
  context: path.resolve(__dirname, '..'),
  entry: {
    'main': [
      'webpack-dev-server/client?http://' + host + ':' + port,
      'webpack/hot/only-dev-server',
      './src/client/index.js'
    ]
  },
  output: {
    path: assetsPath,
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: 'http://' + host + ':' + port + '/dist/'
  },
  module: {
    loaders: [
      { test: /\.(jpe?g|png|gif|svg)$/, loader: 'file' },

      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: [
          'react-hot',
          opts({
            babel: {
              stage: '0',
              optional: 'runtime',
              plugins: 'typecheck'
            }
          })
        ]
      },

      {
        test: /\.scss$/,
        loader: opts({
          style: {},
          css: {},
          autoprefixer: {
            browsers: 'last 2 versions'
          },
          sass: {
            outputStyle: 'expanded',
            sourceMap: 'true',
            sourceMapContents: 'true'
          }
        })
      }

    ]
  },
  progress: true,
  resolve: {
    modulesDirectories: [
      'src',
      'node_modules'
    ],
    extensions: ['', '.json', '.js']
  },
  plugins: [
    // hot reload
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: true,
      __DEVTOOLS__: false  // <-- DISABLE redux-devtools HERE
    }),

    // stats
    function () {
      this.plugin('done', notifyStats);
    },
    function () {
      this.plugin('done', writeStats);
    }
  ]
};
