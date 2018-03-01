import CoButton from './components/button';
import CoButtonGroup from './components/button-group';
import CoIcon from './components/icon';

const coview = {
  CoButton,
  CoButtonGroup,
  CoIcon,
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

export {
  CoButton,
  CoIcon,
};

/* eslint-disable no-undef */
export default {
  version: process.env.VERSION,
  install,
  ...coview,
};
