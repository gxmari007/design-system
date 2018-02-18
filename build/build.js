'use strict';
const path = require('path');
const webpack = require('webpack');
const ora = require('ora');
const chalk = require('chalk');
const rm = require('rimraf');
const prodConfig = require('./webpack.prod.conf');
const prodMinConfig = require('./webpack.prod-min.conf');
const componentConfig = require('./webpack.component.conf');

const spinner = ora('Building lib for production...');

spinner.start();

// 清除 lib 文件夹
rm(path.join(__dirname, '../lib'), (err) => {
  if (err) throw err;

  // 开始构建组件库文件
  webpack([
    prodConfig,
    prodMinConfig,
    componentConfig
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
});
