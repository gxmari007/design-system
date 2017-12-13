const resolve = require('./utils').resolve;

// 配置支持文件类型和代理路径
module.exports = {
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      '@': resolve('src'),
      'coview': resolve('src/index.review.js'),
    },
  },
};
