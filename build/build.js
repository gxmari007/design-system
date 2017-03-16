const path = require('path');
const webpack = require('webpack');
const ora = require('ora');
const rm = require('rimraf');
const chalk = require('chalk');
const config = require('../config');
const webpackProdConfig = require('./webpack.config.prod');
const webpackDevConfig = require('./webpack.config.dev');

process.env.NODE_ENV = 'production';

const spinner = ora('开始构建项目 js 文件...');

spinner.start();

rm(config.build.assetsRoot, (err) => {
  if (err) throw err;

  webpack([webpackDevConfig, webpackProdConfig], (err, stats) => {
    spinner.stop();

    if (err) throw err;

    stats.stats.forEach((state) => {
      process.stdout.write(state.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false,
      }) + '\n\n');
    });

    console.log(chalk.cyan('项目 js 文件构建完成.'));
  });
});
