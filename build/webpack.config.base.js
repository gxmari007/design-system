var utils = require('./utils');
var path = require('path');

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

module.exports = {
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'src': path.resolve(__dirname, '../src'),
      'components': path.resolve(__dirname, '../src/components'),
      'mixins': path.resolve(__dirname, '../src/mixins'),
      'directives': path.resolve(__dirname, '../src/directives'),
      'utils': path.resolve(__dirname, '../src/utils'),
      'coview': path.resolve(__dirname, '../src'),
      'views': path.resolve(__dirname, '../docs/views'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src')],
        options: {
          formatter: require('eslint-friendly-formatter'),
        },
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: require('./vue-loader-config'),
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src')],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('images/[name].[ext]'),
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[ext]'),
        },
      },
    ],
  },
};
