const webpack = require('webpack');
const config = require('../config');
const loaders = require('./loaders');

const definePlugin = new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify(config.env),
  __DEV__: config.env === 'development',
  __TEST__: config.env === 'test',
  __PROD__: config.env === 'production',
  WEBSOCKET_HOST: JSON.stringify(process.env.WEBSOCKET_HOST ||
    (config.env === 'production' ? 'wss://ws.joindowntown.com' : 'ws://localhost:1337')),
  API_HOST: JSON.stringify(process.env.API_HOST ||
    (config.env === 'production' ? 'https://www.joindowntown.com' : 'http://localhost:1337')),
});

module.exports = {
  devtool: 'cheap-module-inline-source-map',
  entry: config.entryPoints,
  output: {
    pathinfo: true,
  },
  stats: {
    errorDetails: true,
  },
  plugins: [
    new webpack.EnvironmentPlugin(JSON.parse(JSON.stringify(process.env))),
    definePlugin,
  ],
  module: {
    loaders,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
