'use strict';
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const portfinder = require('portfinder');
const baseWebpackConfig = require('./webpack.base.conf');
const pkg = require('../package.json');

const devWebpckConfig = merge(baseWebpackConfig, {
  devtool: 'cheap-module-eval-source-map',
  entry: {
    app: './docs/main.js'
  },
  output: {
    filename: '[name].js',
    publicPath: '/'
  },
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join('/', 'index.html') }
      ]
    },
    // 启用 HMR
    hot: true,
    contentBase: false,
    // 启用 gzip 压缩
    compress: true,
    // 指定 host 地址
    host: 'localhost',
    // 指定要监听请求的端口号
    port: 8080,
    // 编译完成的时候自动打开浏览器
    open: false,
    // 当出现编译错误的时候浏览器会显示一个叠加层
    overlay: {
      warnings: false,
      errors: true
    },
    publicPath: '/',
    // 控制台只显示启动信息，错误信息与警告只会在浏览器中显示
    quiet: true,
    // 文件监听 watch 在 webpack-dev-server 中默认开启
    // 监听选项
    watchOptions: {
      poll: false
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process': {
        'env': { 'NODE_ENV': JSON.stringify('development') },
        'VERSION': JSON.stringify(pkg.version)
      }
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
  portfinder.basePort = process.env.PORT;
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err);
    } else {
      resolve(devWebpckConfig);
    }
  });
});
