import CoAffix from './components/affix';
import { CoBreadcrumb, CoBreadcrumbItem } from './components/breadcrumb';
import CoButton from './components/button';
import { CoCheckboxGroup, CoCheckbox } from './components/checkbox';
import CoInput from './components/input';
import CoIcon from './components/icon';
import { CoRow, CoCol } from './components/layout';
import CoLoading from './components/loading';
import CoModal from './components/modal';
import { CoRadioGroup, CoRadio } from './components/radio';

const coview = {
  CoAffix,
  CoBreadcrumb,
  CoBreadcrumbItem,
  CoButton,
  CoCheckboxGroup,
  CoCheckbox,
  CoInput,
  CoIcon,
  CoRow,
  CoCol,
  CoModal,
  CoRadioGroup,
  CoRadio,
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
