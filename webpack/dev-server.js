const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const config = require('../config');
const webpackConfig = require('./config.development');

new WebpackDevServer(webpack(webpackConfig), {
  clientLogLevel: 'none',
  publicPath: webpackConfig.output.publicPath,
  compress: true,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type, Authorization',
  },
  historyApiFallback: true,
  disableHostCheck: true,
  watchOptions: {
    ignored: /node_modules/,
  },
  hot: true,
  overlay: {
    warnings: false,
    errors: true,
  },
  stats: {
    colors: true,
  },
  https: false,
}).listen(config.devPort, config.devHost, (err) => {
  if (err) {
    console.log(err);
  }

  console.log(`Listening at ${config.devHost}:${config.devPort}`);
});
