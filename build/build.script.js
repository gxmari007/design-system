const path = require('path');
const webpack = require('webpack');
const chalk = require('chalk');
const ora = require('ora');
const getAllConfig = require('./config.script');

const configs = getAllConfig();

/**
 * 打印出错误对象
 * @param {Error} e - 错误对象
 */
function logError(e) {
  console.log(e);
}

/**
 * 转化字节数为 KB
 * @param {Number} byte - 字节数
 * @return {Number} - KB
 */
function getSize(byte) {
  return `${(byte / 1024).toFixed(1)}kb`;
}

/**
 * 通过 webpack api 构建组件
 * @param {Object} config - webpack 配置
 * @return {Promise} - 通过 promise 返回构建结果
 */
function buildLib(config) {
  return new Promise((resolve, reject) => {
    const spinner = ora().start();

    webpack(config, (err, stats) => {
      // 处理配置错误
      if (err) {
        spinner.stop();
        return reject(err);
      }

      // 处理编译错误
      if (stats.hasErrors()) {
        spinner.stop();
        return reject(stats.toJson().errors);
      }

      const info = stats.toJson({
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false,
        entrypoints: false,
      });

      const libPath = path.relative(process.cwd(), path.join(info.outputPath, info.assetsByChunkName.main));
      const text = `${libPath} ${chalk.green(getSize(info.assets[0].size))}`;

      spinner.succeed(`${chalk.cyan('[构建]')} ${chalk.yellow('组件')} : ${text}`);

      resolve();
    });
  });
}

/**
 * 启动函数
 */
function build() {
  let index = 0;
  const total = configs.length;
  const next = () => {
    buildLib(configs[index])
      .then(() => {
        index++;

        if (index < total) {
          next();
        }
      })
      .catch(logError);
  };

  next();
}

// let's begging
build();
