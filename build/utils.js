'use strict';
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const config = require('./config');

/**
 * @param {string} _path
 * @returns {string}
 */
exports.assetsPath = (_path) => {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.docsBuild.assetsSubDirectory
    : config.docsDev.assetsSubDirectory;

  return path.posix.join(assetsSubDirectory, _path);
}

/**
 * 返回 vue-loader 的 loaders 配置
 * @param {object} options
 * @param {boolean} options.sourceMap
 * @param {boolean} options.extract
 * @returns {object}
 */
exports.cssLoaders = (options) => {
  const opts = options || {};
  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: opts.sourceMap
    }
  };

  function generateLoaders(loader, loaderOptions) {
    const loaders = [cssLoader];

    if (loader) {
      loaders.push({
        loader: `${loader}-loader`,
        options: Object.assign({}, loaderOptions, {
          sourceMap: opts.sourceMap
        })
      });
    }

    if (opts.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      });
    }

    return ['vue-style-loader'].concat(loaders);
  }

  return {
    css: generateLoaders(),
    less: generateLoaders('less')
  };
}

/**
 * 返回 webpack 的样式 loader 配置
 * @param {object} options
 * @returns {array}
 */
exports.styleLoaders = (options) => {
  const loaders = exports.cssLoaders(options);

  return Object.keys(loaders).map(key => ({
    test: new RegExp(`\\.${key}$`),
    use: loaders[key]
  }));
}
