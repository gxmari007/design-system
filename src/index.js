import { CoBreadcrumb, CoBreadcrumbItem } from './components/breadcrumb';
import { CoRow, CoCol } from './components/layout';
import CoLoading from './components/loading';

const coview = {
  CoBreadcrumb,
  CoBreadcrumbItem,
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

// 在浏览器 script 标签引入的情况下自动安装
if (typeof window !== undefined && window.Vue) {
  install(window.Vue);
}

export default {
  version: '0.1.0',
  install,
  ...coview,
};
