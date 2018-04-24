import CoButton from './components/button';
import CoButtonGroup from './components/button-group';
import CoCol from './components/col';
import CoCollapseTransition from './components/collapse-transition';
import CoIcon from './components/icon';
import CoMenu from './components/menu';
import CoRow from './components/row';

const coview = {
  CoButton,
  CoButtonGroup,
  CoCol,
  CoIcon,
  CoCollapseTransition,
  CoMenu,
  CoMenuItem: CoMenu.CoMenuItem,
  CoItemGroup: CoMenu.CoItemGroup,
  CoSubMenu: CoMenu.CoSubMenu,
  CoRow,
};

function install(Vue) {
  Object.keys(coview).forEach((key) => {
    const component = coview[key];

    Vue.component(component.name, component);
  });
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

/* eslint-disable no-undef */
export default {
  version: process.env.VERSION,
  install,
  ...coview,
};
