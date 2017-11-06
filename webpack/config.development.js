const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');

const config = require('../config');
const sharedConfig = require('./config.shared');

const baseUrl = `http://${config.devHost}:${config.devPort}`;
const publicPath = `${baseUrl}${config.publicPath}`;

const devEntryPoints = [
  `webpack-dev-server/client?${baseUrl}`,
  'webpack/hot/only-dev-server',
  'react-hot-loader/patch',
];

module.exports = merge.strategy({ entry: 'prepend' })(sharedConfig, {
  devtool: 'cheap-module-inline-source-map',
  entry: Object.keys(sharedConfig.entry).reduce((entryPoints, name) => {
    return Object.assign(entryPoints, { [name]: devEntryPoints });
  }, {}),
  output: {
    path: path.join(__dirname, 'dev'),
    filename: 'bundle.js',
    publicPath,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
});
