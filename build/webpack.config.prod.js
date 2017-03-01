const path = require('path');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.config.base');

module.exports = merge(baseWebpackConfig, {
  entry: path.resolve(__dirname, '../src/index.js'),
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'coview.min.js',
    library: 'coview',
    libraryTarget: 'umd',
  },
});
