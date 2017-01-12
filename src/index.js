import { CoRow, CoCol } from './components/layout';
import CoLoading from './components/loading';

const coview = {
  CoRow,
  CoCol,
};

function install(Vue) {
  Object.keys(coview).forEach(key => {
    const component = coview[key];

    Vue.component(component.name, component);
  });

  Vue.prototype.$loading = CoLoading;
}

// 无模块开发环境下自动安装
if (typeof window !== undefined && window.Vue) {
  install(window.Vue);
}

module.exports = {
  version: '0.1.0',
  install,
  ...coview,
};
