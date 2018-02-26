# coview

[![npm](https://img.shields.io/npm/v/coview.svg)](https://www.npmjs.com/package/coview)
[![GitHub license](https://img.shields.io/github/license/gxmari007/coview.svg)](https://github.com/gxmari007/coview/blob/master/LICENSE)

A Vue.js 2.0 ui components for web

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

## License

MIT
