const transitionEvents = {
  beforeEnter(element) {
    const el = element;
    const classes = el.className.split(' ');

    classes.push('co-collapse-transition');
    el.className = classes.join(' ');

    if (!el.dataset) {
      el.dataset = {};
    }

    el.dataset.oldPaddingTop = el.style.paddingTop;
    el.dataset.oldPaddingBottom = el.style.paddingBottom;
    el.style.height = '0';
    el.style.paddingTop = '0';
    el.style.paddingBottom = '0';
  },
  enter(element) {
    const el = element;

    el.dataset.oldOverflow = el.style.overflow;

    if (el.scrollHeight !== 0) {
      el.style.height = `${el.scrollHeight}px`;
    } else {
      el.style.height = '';
    }

    el.style.paddingTop = el.dataset.oldPaddingTop;
    el.style.paddingBottom = el.dataset.oldPaddingBottom;
    el.style.overflow = 'hidden';
  },
  afterEnter(element) {
    const el = element;
    const classes = el.className.split(' ');

    el.className = classes.filter(item => item !== 'co-collapse-transition').join(' ');
    el.style.height = '';
    el.style.overflow = el.dataset.oldOverflow;
  },
  beforeLeave(element) {
    const el = element;

    if (!el.dataset) {
      el.dataset = {};
    }

    el.dataset.oldPaddingTop = el.style.paddingTop;
    el.dataset.oldPaddingBottom = el.style.paddingBottom;
    el.dataset.oldOverflow = el.style.overflow;
    el.style.height = `${el.scrollHeight}px`;
    el.style.overflow = 'hidden';
  },
  leave(element) {
    const el = element;

    if (el.scrollHeight !== 0) {
      const classes = el.className.split(' ');

      classes.push('co-collapse-transition');
      el.className = classes.join(' ');
      el.style.height = '0';
      el.style.paddingTop = '0';
      el.style.paddingBottom = '0';
    }
  },
  afterLeave(element) {
    const el = element;
    const classes = el.className.split(' ');

    el.className = classes.filter(item => item !== 'co-collapse-transition').join(' ');
    el.style.height = '';
    el.style.paddingTop = el.dataset.oldPaddingTop;
    el.style.paddingBottom = el.dataset.oldPaddingBottom;
    el.style.overflow = el.dataset.oldOverflow;
  },
};

export default {
  name: 'CoCollapseTransition',
  functional: true,
  render(h, { children }) {
    const data = {
      on: transitionEvents,
    };

    return h('transition', data, children);
  },
};
