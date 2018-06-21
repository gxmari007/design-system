const path = require('path');
const fs = require('fs');
const vue = require('rollup-plugin-vue').default;
const buble = require('rollup-plugin-buble');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const replace = require('rollup-plugin-replace');
const version = require('../package.json').version;

const banner = `/*!
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

const entry = resolvePath('src/index.js');
const builds = {
  'lib-umd': {
    entry,
    dest: resolvePath('lib/coview.js'),
    format: 'umd',
    banner,
  },
  'lib-prod': {
    entry,
    dest: resolvePath('lib/coview.min.js'),
    format: 'umd',
    env: 'production',
    banner,
  },
  'lib-esm': {
    entry,
    dest: resolvePath('lib/coview.esm.js'),
    format: 'es',
    banner,
  },
  'lib-cjs': {
    entry,
    dest: resolvePath('lib/coview.common.js'),
    format: 'cjs',
    banner,
  },
};

const files = fs.readdirSync(resolvePath('src/components'));
const dirs = ['lib'];

for (let i = 0, len = files.length; i < len; i++) {
  const componentName = files[i];

  builds[componentName] = {
    entry: resolvePath(`src/components/${componentName}/index.js`),
    dest: resolvePath(`lib/${componentName}/index.js`),
    format: 'cjs',
  };
  dirs.push(`lib/${componentName}`);
}

/**
 * 根据传入的 key 构建响应的 rollup 配置
 * @param {String} key - builds 的属性名
 * @return {Object} - rollup 配置
 */
function getConfig(key) {
  const opts = builds[key];
  const config = {
    input: opts.entry,
    external: ['vue'],
    plugins: [
      // 解析 .vue 文件
      vue(),
      // 解析 jsx 语法
      buble({
        objectAssign: 'Object.assign',
        jsx: 'h',
      }),
      // 解析 node 模块文件，附带配置可忽略的文件扩展名
      resolve({
        extensions: ['.js', '.vue', '.json'],
      }),
      // 构建工具理解 commonjs 类型模块
      commonjs(),
      replace({
        'process.env.VERSION': JSON.stringify(version),
      }),
    ].concat(opts.plugins || []),
    output: {
      format: opts.format,
      file: opts.dest,
      name: 'CoView',
      globals: { vue: 'Vue' },
      banner: opts.banner,
    },
  };

  if (opts.env) {
    config.plugins.push(replace({
      'process.env.NODE_ENV': JSON.stringify(opts.env),
    }));
  }

  return config;
}

exports.dirs = dirs;
exports.getAllBuilds = () => Object.keys(builds).map(getConfig);
