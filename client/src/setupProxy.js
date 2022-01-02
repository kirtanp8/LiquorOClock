const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(createProxyMiddleware("/api", { target: "https://spiritsoclock2021.herokuapp.com" }))
}