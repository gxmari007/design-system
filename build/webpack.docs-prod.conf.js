'use strict';
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseWebpackConfig = require('./webpack.base-docs.conf');
const config = require('./config');
const utils = require('./utils');

module.exports = merge(baseWebpackConfig, {
  devtool: config.docsBuild.sourceMap ? config.docsBuild.devtool : false,
  output: {
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.docsBuild.sourceMap,
      extract: true
    })
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.docsBuild.env
    }),
    // new UglifyJsPlugin({
    //   uglifyOptions: {
    //     warnings: false
    //   },
    //   sourceMap: config.docsBuild.sourceMap,
    //   parallel: true
    // }),
    // 提取 chunk 中的样式部分打包进单独 css 文件
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css'),
      allChunks: true,
    }),
    // 优化压缩打包出来的 css 文件
    new OptimizeCSSPlugin({
      cssProcessorOptions: config.docsBuild.sourceMap
        ? { safe: true, map: { inline: false } }
        : { safe: true }
    }),
    new HtmlWebpackPlugin({
      filename: config.docsBuild.index,
      template: './docs/index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      chunksSortMode: 'dependency'
    }),
    // 作用域提升，浏览器中代码执行的更快
    new webpack.optimize.ModuleConcatenationPlugin(),
    // 确保 vendor 模块没有变化的情况下 module.id 不会变化
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks(module) {
        return module.resource
          && /\.js/.test(module.resource)
          && module.resource.indexOf(path.join(__dirname, '../node_modules')) === 0
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'app',
      async: 'vendor-async',
      children: true,
      minChunks: 3
    })
  ]
});
