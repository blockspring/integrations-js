const config = require('../../config');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const base = [
  {
    loader: 'css-loader',
    options: {
      minimize: config.env === 'production',
      sourceMap: true,
    },
  },
  {
    loader: 'postcss-loader',
    options: {
      sourceMap: true,
    },
  },
  'resolve-url-loader',
  {
    loader: 'sass-loader',
    options: {
      sourceMap: true,
    },
  },
];

module.exports = {
  test: /\.(scss|sass|css)$/i,
  use: config.env === 'production' && config.extractText ? ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: base,
  }) : ['style-loader', ...base],
};
