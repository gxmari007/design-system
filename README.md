# CoView

[![npm](https://img.shields.io/npm/v/coview.svg?style=flat-square)](https://www.npmjs.com/package/coview)
[![dependencies Status](https://david-dm.org/gxmari007/coview/status.svg?style=flat-square)](https://david-dm.org/gxmari007/coview)
[![devDependencies Status](https://david-dm.org/gxmari007/coview/dev-status.svg?style=flat-square)](https://david-dm.org/gxmari007/coview?type=dev)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://raw.githubusercontent.com/gxmari007/coview/master/LICENSE)

A Vue.js 2.0 ui components for web

## Install

```` bash
npm install coview --save
````

## Usage

````javascript
import Vue from 'vue';
import CoView from 'coview';

Vue.use(CoView);
````

or

````javascript
import Vue from 'vue';
import { CoButton, CoInput } from 'coview';

Vue.component(CoButton.name, CoButton);
Vue.component(CoInput.name, CoInput);
````

## License

MIT
