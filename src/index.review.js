import CoIcon from './components/icon';

const coview = {
  CoIcon,
};

function install(Vue) {
  Object.keys(coview).forEach((key) => {
    const component = coview[key];

    Vue.component(component.name, component);
  });
}

export {
  CoIcon,
};

/* eslint-disable no-undef */
export default {
  version: VERSION,
  install,
  ...coview,
};
