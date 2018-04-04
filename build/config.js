'use strict';
const path = require('path');

module.exports = {
  docsDev: {
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    // 指定 host 地址
    host: 'localhost',
    // 指定要监听请求的端口号
    port: 8080,
    // 编译完成的时候自动打开浏览器
    autoOpenBrowser: false,
    // 当出现编译错误的时候浏览器会显示一个叠加层
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false,
    devtool: 'cheap-module-eval-source-map',
    cacheBusting: true,
    cssSourceMap: true,
    // env
    env: { 'NODE_ENV': JSON.stringify('development') }
  },
  docsBuild: {
    // template path
    index: path.join(__dirname, '../docs/dist/index.html'),
    assetsRoot: path.join(__dirname, '../docs/dist'),
    // 打包出来的静态文件存放的文件夹名称
    assetsSubDirectory: 'static',
    // gh-pages 只支持相对路径
    assetsPublicPath: '',
    // source maps
    sourceMap: false,
    devtool: '#source-map',
    // env
    env: { 'NODE_ENV': JSON.stringify('production') }
  }
};
