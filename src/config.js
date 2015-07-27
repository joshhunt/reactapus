module.exports = {
  development: {
    isProduction: false,
    port: 4000,
    apiPort: 4040,
    app: {
      name: 'Reactapus Development'
    }
  },
  production: {
    isProduction: true,
    port: process.env.PORT,
    apiPort: 3030,
    app: {
      name: 'Reactapus Production'
    }
  }
}[process.env.NODE_ENV || 'development'];
