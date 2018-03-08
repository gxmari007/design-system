import CoButton from 'components/button';
import CoButtonGroup from 'components/button-group';
import CoCol from 'components/col';
import CoIcon from 'components/icon';
import CoRow from 'components/row';

const coview = {
  CoButton,
  CoButtonGroup,
  CoCol,
  CoIcon,
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

export {
  CoButton,
  CoButtonGroup,
  CoCol,
  CoIcon,
  CoRow,
};

/* eslint-disable no-undef */
export default {
  version: process.env.VERSION,
  install,
  ...coview,
};
