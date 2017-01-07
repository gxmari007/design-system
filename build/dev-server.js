const path = require('path');
const express = require('express');
const webpack = require('webpack');
// 强制打开浏览器跳转到指定 url 的插件
const opn = require('opn');
const config = require('../config');
const webpackConfig = require('./webpack.config.dev');

// 设置 Node 环境
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV);
}

// 如果没有设置端口则用 config.dev.port 作为运行端口
const port = process.env.PORT || config.dev.port;

// 创建 express 服务
const app = express();
