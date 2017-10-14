const path = require('path');
const express = require('express');
const webpack = require('webpack');
// 强制打开浏览器跳转到指定 url 的插件
const opn = require('opn');
const config = require('../config');
const webpackConfig = require('./webpack.config.docs');

// 设置 Node 环境
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.docs.env.NODE_ENV);
}

// 如果没有设置端口则用 config.docs.port 作为运行端口
const port = process.env.PORT || config.docs.port;
const autoOpenBrowser = !!config.docs.autoOpenBrowser;

const app = express();
const compiler = webpack(webpackConfig);

// webpack-dev-middleware 服务，把编译后的文件暂存到内存中
const devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true,
});

// 代码热切换中间件
const hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: false,
  heartbeat: 2000
});

// 修改 html 文件的时候也需要刷新页面
compiler.plugin('compilation', (compilation) => {
  compilation.plugin('html-webpack-plugin-after-emit', (data, cb) => {
    hotMiddleware.publish({ action: 'reload' });
    cb();
  });
});

/* 载入中间件 */

// html5 history fallback
app.use(require('connect-history-api-fallback')());
app.use(devMiddleware);
app.use(hotMiddleware);

const staticPath = path.join(config.docs.assetsPublicPath, config.docs.assetsSubDirectory);

app.use(staticPath, express.static(path.join(__dirname, '../docs/static')));

let _resolve;
const readyPromise = new Promise(resolve => {
  _resolve = resolve;
});

const uri = `http://localhost:${port}`;

devMiddleware.waitUntilValid(() => {
  if (autoOpenBrowser) {
    opn(uri);
  }

  _resolve();
});

const server = app.listen(port);

module.exports = {
  ready: readyPromise,
  close: server.close,
};
