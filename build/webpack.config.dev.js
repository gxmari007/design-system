const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.config.base');
const config = require('../config');

module.exports = merge(baseWebpackConfig, {
  entry: path.resolve(__dirname, '../src/index.js'),
  output: {
    path: config.build.assetsRoot,
    filename: 'coview.js',
    library: 'coview',
    libraryTarget: 'umd',
  },
  externals: {
    vue: {
      root: 'Vue',
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue',
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.build.env,
    }),
  ],
});
