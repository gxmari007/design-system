'use strict';
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const portfinder = require('portfinder');
const baseWebpackConfig = require('./webpack.base-docs.conf');
const config = require('./config');
const pkg = require('../package.json');

function createNotifierCallback() {
  const notifier = require('node-notifier');

  return (severity, errors) => {
    if (severity !== 'error') return;

    const error = errors[0];
    const filename = error.file && error.file.split('!').pop();

    notifier.notify({
      title: pkg.name,
      message: severity + ': ' + error.name,
      subtitle: filename || ''
    });
  }
}

const devWebpckConfig = merge(baseWebpackConfig, {
  devtool: config.docsDev.devtool,
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.docsDev.assetsPublicPath, 'index.html') }
      ]
    },
    // 启用 HMR
    hot: true,
    contentBase: false,
    // 启用 gzip 压缩
    compress: true,
    // 指定 host 地址
    host: process.env.HOST || config.docsDev.host,
    // 指定要监听请求的端口号
    port: Number(process.env.PORT) || config.docsDev.port,
    // 编译完成的时候自动打开浏览器
    open: config.docsDev.autoOpenBrowser,
    // 当出现编译错误的时候浏览器会显示一个叠加层
    overlay: config.docsDev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.docsDev.assetsPublicPath,
    // 屏蔽 webpack 的信息，使用 FriendlyErrorsPlugin 代替
    quiet: true,
    // 文件监听 watch 在 webpack-dev-server 中默认开启
    // 监听选项
    watchOptions: {
      poll: config.docsDev.poll
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.docsDev.env
    }),
    // HMR
    new webpack.HotModuleReplacementPlugin(),
    // 当开启 HMR 的时候使用该插件会显示模块的相对路径
    new webpack.NamedModulesPlugin(),
    // 确保编译出错的时候不会停止 dev-server
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      // 输出的文件名称
      filename: 'index.html',
      // 制定模版文件路径
      template: './docs/index.html',
      // 是否自动在 body 标签末尾插入编译的脚本文件
      inject: true
    })
  ]
});

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.docsDev.port;
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err);
    } else {
      process.env.PORT = port;
      devWebpckConfig.devServer.port = port;

      // 添加 FriendlyErrorsPlugin 插件配置
      // 用于显示更友好的错误信息
      devWebpckConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`You application is running here: http://${devWebpckConfig.devServer.host}:${port}`]
        },
        onErrors: config.docsDev.notifyOnErrors
          ? createNotifierCallback()
          : undefined
      }));

      resolve(devWebpckConfig);
    }
  });
});
