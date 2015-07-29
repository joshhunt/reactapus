import React from 'react';
import Location from 'react-router/lib/Location';
import serialize from 'serialize-javascript';

import createStore from 'app/redux/create';
import ApiClient from 'app/ApiClient';
import universalRouter from 'app/universalRouter';

let webpackStats;

// Get the webpack stats (for production) to get URLs for the assets
if (!__DEVELOPMENT__) {
  webpackStats = require('../../webpack-stats.json');
}

const renderLayout = ({viewComponent, store}) => {
  const dehydratedState = serialize(store.getState());

  return '<!doctype html>\n' + React.renderToString(
    <html>
      <head>
        <title>Reactapus</title>

        <link href="//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.5/css/bootstrap.css"
          rel="stylesheet" type="text/css"/>
        <link href="//cdnjs.cloudflare.com/ajax/libs/font-awesome/4.3.0/css/font-awesome.min.css"
          rel="stylesheet" type="text/css"/>

        { webpackStats.css.map((css, i) =>
          <link href={css} ref={i} media="screen, projection" rel="stylesheet" type="text/css"/> )}
      </head>

      <body>
        <div id="content" dangerouslySetInnerHTML={{__html: React.renderToString(viewComponent)}}/>

        <script dangerouslySetInnerHTML={{__html: `window.__data=${dehydratedState};`}}/>
        <script src={webpackStats.script[0]}/>
      </body>

    </html>
  );
};

module.exports = (req, res, next) => {

  if (__DEVELOPMENT__) {
    // Require a fresh webpack-stats for each request since the script files
    // change for live reaload/hot module replacement
    webpackStats = require('../../webpack-stats.json');
    delete require.cache[require.resolve('../../webpack-stats.json')];
  }

  const apiClient = new ApiClient(req);
  const store = createStore(apiClient);
  const location = new Location(req.path, req.query);

  universalRouter(location, undefined, store)
    .then( ({viewComponent, transition, isRedirect}) => {
      // render viewComponent to string and send it back to the client

      if (isRedirect) {
        res.redirect(transition.redirectInfo.pathname);
        return;
      }

      try {
        const page = renderLayout({webpackStats, store, viewComponent});
        res.send(page);
      } catch (err) {
        next(err);
      }
    }, (err) => {
      next(err);
    });
};
