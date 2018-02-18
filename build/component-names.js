'use strict';
const fs = require('fs');
const path = require('path');

const componentPath = '../src/_components';
const files = fs.readdirSync(path.join(__dirname, componentPath));
const entry = {};

files.forEach((file) => {
  entry[file] = path.join(__dirname, componentPath, `${file}/index.js`);
});

module.exports = entry;
