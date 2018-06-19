/**
 * rollup 配置
 */

import path from 'path';
import vue from 'rollup-plugin-vue';
import buble from 'rollup-plugin-buble';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import pkg from '../package.json';

export default {
  // 文件入口
  input: path.resolve(__dirname, '../src/index.js'),
  // 文件导出配置
  output: {
    name: 'CoView',
    file: path.resolve(__dirname, `../lib/${pkg.name}.js`),
    format: 'umd',
  },
  plugins: [
    // 解析 vue 文件
    vue(),
    // 支持 jsx 编译
    buble({
      objectAssign: 'Object.assign',
      jsx: 'h',
    }),
    // 解析 node 模块文件，附带配置可忽略的文件扩展名
    resolve({
      extensions: ['.js', '.vue', '.json'],
    }),
    commonjs(),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
      'process.env.VERSION': JSON.stringify(pkg.version),
    }),
  ],
};
