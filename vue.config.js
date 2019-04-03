const subApp = require('./server')

module.exports = {
  devServer: {
    before: (app, server) => {
      app.use(subApp)
    }
  },
  chainWebpack: (config) => {}
}
