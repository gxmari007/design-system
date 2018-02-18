'use strict';
const path = require('path');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base-prod.conf');

module.exports = merge(baseWebpackConfig, {
  output: {
    path: path.join(__dirname, '../lib'),
    filename: 'coview.js',
    library: 'coview',
    libraryTarget: 'umd',
    umdNamedDefine: true
  }
});
