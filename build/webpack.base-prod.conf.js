'use strict';
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const pkg = require('../package.json');

module.exports = merge(baseWebpackConfig, {
  entry: './src/index.review.js',
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
      'process': {
        'env': {
          'NODE_ENV': JSON.stringify('production'),
          'VERSION': JSON.stringify(pkg.version)
        }
      }
    }),
    // 作用域提升，打包出来的代码更小，执行速度更快
    new webpack.optimize.ModuleConcatenationPlugin()
  ]
});
