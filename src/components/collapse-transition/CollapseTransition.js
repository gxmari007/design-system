// const transitionEvents = {
//   beforeEnter(element) {
//     const el = element;

//     el.className = 'co-collapse-transition';
//     el.style.height = '0';
//   },
// };

export default {
  name: 'CoCollapseTransition',
  functional: true,
  render(h, { data, children }) {
    // const data = {
    //   on: transitionEvents,
    // };

    return h('transition', data, children);
  },
};
