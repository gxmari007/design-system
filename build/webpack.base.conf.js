'use strict';
const path = require('path');
const webpack = require('webpack');

// 解析路径
function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

module.exports = {
  context: path.join(__dirname, '../'),
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      // eslint 代码检查
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('docs'), resolve('src')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      // 编译 vue 文件
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            css: 'vue-style-loader!css-loader',
            less: 'vue-style-loader!css-loader!less-loader',
          },
          preserveWhitespace: false,
          cacheBusting: true,
          transformToRequire: {
            video: ['src', 'poster'],
            source: 'src',
            img: 'src',
            image: 'xlink:href'
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('docs'), resolve('src'), resolve('node_modules/webpack-dev-server/client')]
      }
    ]
  }
};
