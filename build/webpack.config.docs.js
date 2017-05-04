const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const baseWebpackConfig = require('./webpack.config.base');
const config = require('../config');
const utils = require('./utils');

module.exports = merge(baseWebpackConfig, {
  devtool: '#cheap-module-eval-source-map',
  // 入口
  entry: {
    app: [utils.resolve('build/docs-client.js'), utils.resolve('docs/index.js')],
  },
  // 输出
  output: {
    path: config.build.assetsRoot,
    publicPath: config.docs.assetsPublicPath,
    filename: '[name].js',
  },
  module: {
    rules: utils.styleLoaders({ sourceMap: config.docs.cssSourceMap }),
  },
  // 插件
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.docs.env,
    }),
    // HotModule 插件在页面进行变更的时候只会重回对应的页面模块，不会重绘整个 html 文件
    new webpack.HotModuleReplacementPlugin(),
    // 使用了 NoErrorsPlugin 后页面中的报错不会阻塞，但是会在编译结束后报错
    new webpack.NoEmitOnErrorsPlugin(),
    // 将 index.html 作为入口，注入 html 代码后生成 index.html文件
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: utils.resolve('docs/index.html'),
      inject: true,
    }),
    new FriendlyErrorsPlugin(),
  ],
});
