const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const merge = require('webpack-merge');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const pkg = require('../package.json');

const libName = pkg.name;
const version = pkg.version;
const banner = `
/*!
 * CoView v${version}
 * (c) 2017-${new Date().getFullYear()} gxmari007
 * Released under the MIT License.
 */
`;

/**
 * 以项目根路径为基础获取实际的路径地址
 * @param {String} _path - 路径
 * @return {String} - 构建的绝对路径
 */
function resolvePath(_path) {
  return path.resolve(__dirname, '../', _path);
}

// 主文件入口路径
const entry = resolvePath('src/index.js');
// 需要打包出来的模块 webpack 关键配置参数
const builds = {
  'lib-umd': {
    entry,
    path: resolvePath('lib'),
    filename: `${libName}.js`,
    libraryTarget: 'umd',
  },
  'lib-prod': {
    entry,
    path: resolvePath('lib'),
    filename: `${libName}.min.js`,
    libraryTarget: 'umd',
    env: 'production',
  },
  // 'lib-esm': {
  //   entry,
  //   path: resolvePath('lib'),
  //   filename: `${libName}.esm.js`,
  // },
};
// 获取所有的组件名称
const files = fs.readdirSync(resolvePath('src/components'));

// 根据组件名称数组获取每个组件的关键 webpack 配置参数
files.forEach((componentName) => {
  builds[componentName] = {
    entry: resolvePath(`src/components/${componentName}/index.js`),
    path: resolvePath(`lib/${componentName}`),
    filename: 'index.js',
    libraryTarget: 'commonjs2',
  };
});

/**
 * 根据传入的 buildKey 获取相应的 webpack 配置
 * @param {String} key - builds 属性名
 * @return {Object} - webpack 配置
 */
function getConfig(key) {
  const options = builds[key];
  let config = {
    mode: 'none',
    entry: options.entry,
    output: {
      path: options.path,
      filename: options.filename,
      library: 'CoView',
      libraryTarget: options.libraryTarget,
    },
    externals: ['vue'],
    resolve: {
      extensions: ['.js', '.vue'],
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: ['babel-loader'],
          exclude: /node_modules/,
        },
        {
          test: /\.vue$/,
          use: ['vue-loader'],
        },
      ],
    },
    plugins: [
      new VueLoaderPlugin(),
      new webpack.DefinePlugin({
        'process.env.VERSION': JSON.stringify(version),
      }),
    ],
  };

  if (options.env) {
    config = merge(config, {
      plugins: [
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify(options.env),
        }),
      ],
    });
  }

  if (options.env === 'production') {
    config = merge(config, {
      plugins: [
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              warnings: false,
            },
          },
        }),
      ],
    });
  }

  return config;
}

/**
 * 导出所有的 webpack 配置
 * @return {Array} - webapck 配置数组
 */
function getAllConfig() {
  return Object.keys(builds).map(getConfig);
}

module.exports = getAllConfig;
