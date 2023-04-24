const { createProxyMiddleware } = require("http-proxy-middleware");

// src/setupProxy.js
module.exports = function (app) {
  app.use(
    createProxyMiddleware(["/api", "/admin"], {
      target: process.env.REACT_APP_BACK_URL_FOR_HOME,
      changeOrigin: true,
      timeout: 1500,
    })
  );
};
