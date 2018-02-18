'use strict';
const path = require('path');
const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const baseWebpackConfig = require('./webpack.base-prod.conf');

module.exports = merge(baseWebpackConfig, {
  output: {
    path: path.join(__dirname, '../lib'),
    filename: 'coview.min.js',
    library: 'coview',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  plugins: [
    new UglifyJsPlugin({
      uglifyOptions: {
        warnings: false
      },
      parallel: true
    })
  ]
});
