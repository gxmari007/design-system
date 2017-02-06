const path = require('path');
const utils = require('./utils');
const autoprefixer = require('autoprefixer');

const projectRoot = path.resolve(__dirname, '../');

module.exports = {
  resolve: {
    alias: {
      'components': path.resolve(__dirname, '../src/components'),
      'mixins': path.resolve(__dirname, '../src/mixins'),
      'utils': path.resolve(__dirname, '../src/utils'),
    },
  },
  // webpack 编译中需要用到的模块
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue',
      },
      {
        test: /\.js$/,
        loader: 'babel',
        include: projectRoot,
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('images/[name].[hash:5].[ext]'),
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:5].[ext]'),
        },
      },
    ],
  },
  postcss: [
    autoprefixer({
      browsers: ['last 2 versions'],
    }),
  ],
  vue: {
    postcss: [
      autoprefixer({
        browsers: ['last 2 versions'],
      }),
    ],
  },
};
