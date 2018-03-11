import CoButton from 'components/button';
import CoButtonGroup from 'components/button-group';
import CoCol from 'components/col';
import CoIcon from 'components/icon';
import CoMenu from 'components/menu';
import CoRow from 'components/row';

const coview = {
  CoButton,
  CoButtonGroup,
  CoCol,
  CoIcon,
  CoMenu,
  CoMenuItem: CoMenu.CoMenuItem,
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
