// process.env.NODE_ENV = 'production';

const webpack = require('webpack');
const ora = require('ora');
const rm = require('rimraf');
const chalk = require('chalk');
const config = require('../config');
const webpackProdConfig = require('./webpack.config.prod');
const pkg = require('../package.json');

const spinner = ora(`Building ${pkg.name} library for production...`).start();

rm(config.build.assetsRoot, (err) => {
  if (err) throw err;

  webpack(webpackProdConfig, (err, stats) => {
    spinner.stop();

    if (err) throw err;

    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false,
    }) + '\n\n');

    console.log(chalk.cyan(`  ${pkg.name} build complete.\n`));
  });
});
