var utils = require('./utils');
var config = require('../config');

var isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: isProduction ?
      config.build.cssSourceMap :
      config.docs.cssSourceMap,
    extract: isProduction,
  }),
  // 是否保留 html 标签之间的空格
  // 比如去除 inline-block 元素之间空隙
  preserveWhitespace: false,
};
