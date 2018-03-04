'use strict';
const path = require('path');
const webpack = require('webpack');
const utils = require('./utils');
const config = require('./config');

const isProduction = process.env.NODE_ENV === 'production';

/**
 * 解析路径
 * @param {String} _path
 * @returns {String}
 */
function resolve(_path) {
  return path.join(__dirname, '..', _path);
}

module.exports = {
  context: path.join(__dirname, '../'),
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': resolve('src'),
      '~': resolve('docs'),
      'components': resolve('src/components'),
      'directives': resolve('src/directives'),
      'mixins': resolve('src/mixins'),
      'utils': resolve('src/utils')
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
          loaders: utils.cssLoaders({
            sourceMap: isProduction
              ? config.docsBuild.sourceMap
              : config.docsDev.sourceMap,
            extract: isProduction
          }),
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
