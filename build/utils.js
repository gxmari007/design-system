const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const config = require('../config');

exports.assetsPath = (_path) => {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.docs.assetsSubDirectory;

  return path.join(assetsSubDirectory, _path);
}

exports.cssLoaders = (options) => {
  options = options || {};

  function generateLoaders(loaders) {
    const sourceLoader = loaders.map((loader) => {
      let extraParamChar = '';

      if (/\?/.test(loader)) {
        loader = loader.replace(/\?/, '-loader?');
        extraParamChar = '&';
      } else {
        loader = `${loader}-loader`;
        extraParamChar = '?';
      }

      return `${loader}${options.sourceMap ? `${extraParamChar}sourceMap` : ''}`;
    }).join('!');

    if (options.extract) {
      return ExtractTextPlugin.extract('vue-style-loader', sourceLoader);
    } else {
      return ['vue-style-loader', sourceLoader].join('!');
    }
  }

  return {
    css: generateLoaders(['css']),
    postcss: generateLoaders(['css']),
    less: generateLoaders(['css', 'postcss', 'less']),
  };
}

exports.styleLoaders = (options) => {
  const loaders = exports.cssLoaders(options);

  return Object.keys(loaders).map(key => ({
    test: new RegExp('\\.' + key + '$'),
    loader: loaders[key],
  }));
}
