# CoView

[![npm](https://img.shields.io/npm/v/coview.svg)](https://www.npmjs.com/package/coview)
[![GitHub license](https://img.shields.io/github/license/gxmari007/coview.svg)](https://github.com/gxmari007/coview/blob/master/LICENSE)

一个基于 Vue.js 2.0，样式基于 Ant Design 的 UI 组件库，还只是个玩具而已，千万不要放到生产环境:no_good_woman:，如果你有冒险精神的话:stuck_out_tongue_winking_eye:。

## 安装

npm 和 yarn 都可以安装，推荐用 yarn。

```sh
npm install coview --save
```

或者

```sh
yarn install coview --save
```

## 使用方法

```javascript
import Vue from 'vue';
import CoView from 'coview';

Vue.use(CoView);
```

或者

````javascript
import Vue from 'vue';
import { CoButton, CoInput } from 'coview';

Vue.component(CoButton.name, CoButton);
Vue.component(CoInput.name, CoInput);
````

## 文档

```sh
# 运行文档开发模式
npm run docs:dev

# 构建文档
npm run docs:build
```

## License

MIT
