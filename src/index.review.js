import { CoButton } from './components/button';
import CoIcon from './components/icon';

const coview = {
  CoButton,
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
