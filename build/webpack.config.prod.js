const webpack = require('webpack');
const merge = require('webpack-merge');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const baseConfig = require('./webpack.config.base');
const utils = require('./utils');
const config = require('../config');

module.exports = merge(baseConfig, {
  entry: utils.resolve('src/index.js'),
  output: {
    path: config.build.assetsRoot,
    filename: 'coview.js',
    library: 'coview',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  externals: {
    vue: {
      root: 'Vue',
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue'
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.build.env
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    // new BundleAnalyzerPlugin()
  ]
})
