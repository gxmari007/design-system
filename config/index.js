var path = require('path');

module.exports = {
  build: {
    env: require('./prod.env'),
    assetsRoot: path.join(__dirname, '../lib'),
    assetsPublicPath: '/',
    cssSourceMap: true,
  },
  docs: {
    env: require('./docs.env'),
    port: 8080,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    autoOpenBrowser: true,
    cssSourceMap: true,
  },
};
