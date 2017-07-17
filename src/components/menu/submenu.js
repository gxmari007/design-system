import CoSubmenu from './submenu.vue';

export default {
  name: 'co-submenu',
  functional: true,
  props: {
    name: {
      type: [String, Number],
      required: true,
    },
    title: String,
  },
  render(h, { parent, props, children }) {
    const data = {
      props: {
        placement: 'bottom-start',
        ...props,
      },
    };

    return parent.$createElement(CoSubmenu, data, children);
  },
};
