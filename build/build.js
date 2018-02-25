'use strict';
process.env.NODE_ENV = 'production';

const path = require('path');
const webpack = require('webpack');
const ora = require('ora');
const chalk = require('chalk');
const rm = require('rimraf');
const prodConfig = require('./webpack.prod.conf');
const prodMinConfig = require('./webpack.prod-min.conf');
const componentConfig = require('./webpack.component.conf');
const docsConfig = require('./webpack.docs-prod.conf');

const spinner = ora('Building lib for production...');

spinner.start();

// 删除指定路径的文件
function removeDirP(_path) {
  return new Promise((resolve, reject) => {
    rm(_path, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

async function runBuild() {
  try {
    await removeDirP(path.resolve(__dirname, '../lib'));
    await removeDirP(path.resolve(__dirname, '../docs/dist'));

    // 开始构建组件库文件
    webpack([
      prodConfig,
      prodMinConfig,
      componentConfig,
      docsConfig
    ], (err, stats) => {
      spinner.stop();

      if (err) throw err;

      process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        chunks: false,
        chunkModules: false,
        // children: false
      }) + '\n\n');

      if (stats.hasErrors()) {
        console.log(chalk.red('Script build failed with errors.\n'));
        process.exit(1);
      }

      console.log(chalk.cyan('Script build complete.\n'));
    });
  } catch (err) {
    throw err;
  }
}

// 开始构建脚本文件
runBuild();
