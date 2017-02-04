const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseWebpackConfig = require('./webpack.config.base');
const config = require('../config');
const utils = require('./utils');

module.exports = merge(baseWebpackConfig, {
  devtool: '#eval-source-map',
  // 入口
  entry: {
    app: [path.resolve(__dirname, './docs-client'), path.resolve(__dirname, '../docs/index.js')],
  },
  // 输出
  output: {
    path: config.build.assetsRoot,
    publicPath: config.docs.assetsPublicPath,
    filename: '[name].js',
  },
  resolve: {
    // 自动补全扩展名
    extensions: ['', '.js', '.vue'],
    // 不进行补全或处理的文件或文件夹
    fallback: [
      path.resolve(__dirname, '../node_modules'),
    ],
    // 路径代理
    alias: {
      'coview': path.resolve(__dirname, '../src'),
      'views': path.resolve(__dirname, '../docs/views'),
    },
  },
  module: {
    loaders: utils.styleLoaders({ sourceMap: config.docs.cssSourceMap }),
  },
  // vue 配置
  vue: {
    loaders: utils.cssLoaders({ sourceMap: config.docs.cssSourceMap }),
  },
  // 插件
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.docs.env,
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    // HotModule 插件在页面进行变更的时候只会重回对应的页面模块，不会重绘整个 html 文件
    new webpack.HotModuleReplacementPlugin(),
    // 使用了 NoErrorsPlugin 后页面中的报错不会阻塞，但是会在编译结束后报错
    new webpack.NoErrorsPlugin(),
    // 将 index.html 作为入口，注入 html 代码后生成 index.html文件
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '../docs/index.html'),
      inject: true,
    }),
  ],
});
