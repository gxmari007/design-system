const path = require('path');

module.exports = {
  build: {
    env: require('./prod.env'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'lib',
    cssSourceMap: true,
  },
  docs: {
    env: require('./docs.env'),
    port: 8080,
    assetsPublicPath: '/',
    assetsSubDirectory: 'static',
    cssSourceMap: false,
  },
};
