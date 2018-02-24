'use strict';
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const config = require('./config');
const pkg = require('../package.json');

module.exports = merge(baseWebpackConfig, {
  entry: {
    app: './docs/main.js'
  },
  output: {
    path: config.docsBuild.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.docsBuild.assetsPublicPath
      : config.docsDev.assetsPublicPath
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.VERSION': JSON.stringify(pkg.version)
    })
  ]
});