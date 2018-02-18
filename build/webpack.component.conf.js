'use strict';
const path = require('path');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base-prod.conf');
const entry = require('./component-names');

module.exports = merge(baseWebpackConfig, {
  entry,
  output: {
    path: path.join(__dirname, '../lib'),
    filename: '[name].js',
    library: 'coview/lib',
    libraryTarget: 'umd',
    umdNamedDefine: true
  }
});
