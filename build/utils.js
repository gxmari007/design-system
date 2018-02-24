'use strict';
const path = require('path');
const config = require('./config');

exports.assetsPath = (_path) => {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.docsBuild.assetsSubDirectory
    : config.docsDev.assetsSubDirectory;

  return path.posix.join(assetsSubDirectory, _path);
}
