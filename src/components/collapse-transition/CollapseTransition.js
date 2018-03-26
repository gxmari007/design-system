import { addClass, removeClass } from 'utils/help';

const transitionEvents = {
  beforeEnter(element) {
    const el = element;

    addClass(el, 'co-collapse-transition');

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

    removeClass(el, 'co-collapse-transition');
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
      addClass(el, 'co-collapse-transition');
      el.style.height = '0';
      el.style.paddingTop = '0';
      el.style.paddingBottom = '0';
    }
  },
  afterLeave(element) {
    const el = element;

    removeClass(el, 'co-collapse-transition');
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
