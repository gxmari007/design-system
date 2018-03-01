import addClass from 'dom-helpers/class/addClass';
import removeClass from 'dom-helpers/class/removeClass';

const transition = {
  beforeLeave(el) {
    if (!el.dataset) {
      el.dataset = {};
    }

    el.dataset.oldPaddingRight = el.style.paddingRight;
    el.dataset.oldPaddingLeft = el.style.paddingLeft;
    el.dataset.oldMarginRight = el.style.marginRight;
    el.dataset.oldMarginLeft = el.style.marginLeft;
    el.dataset.oldOverflow = el.style.overflow;
    el.dataset.oldOpacity = el.style.opacity;
    el.dataset.oldTransform = el.style.transform;

    el.style.width = `${el.scrollWidth}px`;
    el.style.overflow = 'hidden';
    el.style.opacity = '1';
    el.style.transform = 'scale(1)';
  },
  leave(el) {
    if (el.scrollWidth > 0) {
      addClass(el, 'co-tag--leave');
      el.style.width = '0';
      el.style.paddingRight = '0';
      el.style.paddingLeft = '0';
      el.style.marginRight = '0';
      el.style.marginLeft = '0';
      el.style.opacity = '0';
      el.style.transform = 'scale(0)';
    }
  },
  afterLeave(el) {
    removeClass(el, 'co-tag--leave');
    el.style.width = '';
    el.style.paddingRight = el.dataset.oldPaddingRight;
    el.style.paddingLeft = el.dataset.oldPaddingLeft;
    el.style.marginRight = el.dataset.oldMarginRight;
    el.style.marginLeft = el.dataset.oldMarginLeft;
    el.style.overflow = el.dataset.oldOverflow;
    el.style.opacity = el.dataset.oldOpacity;
    el.style.transform = el.dataset.oldTransform;
  },
};

export default {
  name: 'co-tag-transition',
  functional: true,
  render(h, { children }) {
    const data = {
      props: {
        name: 'co-fade',
      },
      on: transition,
    };

    return h('transition', data, children);
  },
};
