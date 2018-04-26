# coview

[![npm](https://img.shields.io/npm/v/coview.svg)](https://www.npmjs.com/package/coview)
[![GitHub license](https://img.shields.io/github/license/gxmari007/coview.svg)](https://github.com/gxmari007/coview/blob/master/LICENSE)

A Vue.js 2.0 ui components for web，暂时只是个玩具

## 安装

```` bash
npm install coview --save
````

## 使用方法

````javascript
import Vue from 'vue';
import CoView from 'coview';

Vue.use(CoView);
````

或者

````javascript
import Vue from 'vue';
import { CoButton, CoInput } from 'coview';

Vue.component(CoButton.name, CoButton);
Vue.component(CoInput.name, CoInput);
````

## Todos

- [x] 更改 eslint 配置，使其能够兼容组件开发和文档开发
- [ ] 组件库打包工具从 webpack 改为 rollup 以提高性能

## License

MIT
