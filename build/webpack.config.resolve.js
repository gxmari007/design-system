const resolve = require('./utils').resolve;

// 配置支持文件类型和代理路径
module.exports = {
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'src': resolve('src'),
      'components': resolve('src/components'),
      'directives': resolve('src/directives'),
      'mixins': resolve('src/mixins'),
      'utils': resolve('src/utils')
    }
  }
}
