import CoAffix from 'components/affix';
import CoBackTop from 'components/back_top';
import { CoBreadcrumb, CoBreadcrumbItem } from 'components/breadcrumb';
import CoButton from 'components/button';
import { CoCheckboxGroup, CoCheckbox } from 'components/checkbox';
import { CoDropdown, CoDropdownMenu, CoDropdownItem } from 'components/dropdown';
import CoInput from 'components/input';
import CoIcon from 'components/icon';
import { CoRow, CoCol } from 'components/layout';
import CoLoading from 'components/loading';
import CoModal from 'components/modal';
import { CoRadioGroup, CoRadio } from 'components/radio';
import { CoSelect, CoOption } from 'components/select';

const coview = {
  CoAffix,
  CoBackTop,
  CoBreadcrumb,
  CoBreadcrumbItem,
  CoButton,
  CoCheckboxGroup,
  CoCheckbox,
  CoDropdown,
  CoDropdownMenu,
  CoDropdownItem,
  CoInput,
  CoIcon,
  CoRow,
  CoCol,
  CoModal,
  CoRadioGroup,
  CoRadio,
  CoSelect,
  CoOption,
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
