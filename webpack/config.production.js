const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');
const config = require('../config');
const sharedConfig = require('./config.shared');
const BootJsPlugin = require('./plugins/BootJsPlugin');

module.exports = merge(sharedConfig, {
  devtool: 'source-map',
  stats: 'normal',
  output: {
    path: path.join(__dirname, '..', 'dist'),
    filename: '[name].[chunkhash].js',
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({ sourceMap: true, comments: false }),
    config.extractText ? new ExtractTextPlugin({
      filename: '[name].[chunkhash].css',
      allChunks: true,
    }) : null,
    new BootJsPlugin(),
  ].filter(p => !!p),
});
