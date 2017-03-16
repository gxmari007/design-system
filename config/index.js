const path = require('path');

module.exports = {
  build: {
    env: require('./prod.env'),
    assetsRoot: path.resolve(__dirname, '../lib'),
    assetsPublicPath: '/',
    cssSourceMap: true,
  },
  docs: {
    env: require('./docs.env'),
    port: 8080,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    cssSourceMap: true,
  },
};
