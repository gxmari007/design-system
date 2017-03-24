import Vue from 'vue';
import requestAnimationFrame from 'dom-helpers/util/requestAnimationFrame';
import scrollTop from 'dom-helpers/query/scrollTop';

// 验证十六进制颜色值
export const colorRegex = /#([\da-f]{3}){1,2}/i;

// 组件 props 验证方法
// 验证第一个参数是否为第二个参数中的值
export function oneOf(value, valueList) {
  return valueList.indexOf(value) !== -1;
}

// 滚动条滚动方法（动画效果）
export function scrollTo(element, from, to, duration = 600) {
  const different = Math.abs(from - to);
  const step = Math.ceil(different / duration * 60);

  function scroll(start, end, step) {
    // 从下向上滚动
    let d = start - step < end ? end : start - step;

    // 从上向下滚动
    if (start < end) {
      d = start + step > end ? end : start + step;
    }

    scrollTop(element, d);

    if (d !== end) {
      requestAnimationFrame(() => scroll(d, end, step));
    }
  }

  scroll(from, to, step);
}

let scrollBarWidth;

// 获取滚动条宽度
// 缓存结果方便下次获取
export function getScrollBarWidth() {
  if (Vue.prototype.$isServer) {
    return 0;
  }

  if (typeof scrollBarWidth === 'undefined') {
    const outer = document.createElement('div');
    const inner = document.createElement('div');

    outer.style.visibility = 'hidden';
    outer.style.width = '100px';
    outer.style.position = 'absolute';
    outer.style.zIndex = '-999';
    outer.style.overflow = 'scroll';

    inner.style.width = '100%';

    document.body.appendChild(outer);
    outer.appendChild(inner);

    const outerWidth = outer.offsetWidth;
    const innerWidth = inner.offsetWidth;

    document.body.removeChild(outer);
    scrollBarWidth = outerWidth - innerWidth;
  }

  return scrollBarWidth;
}
