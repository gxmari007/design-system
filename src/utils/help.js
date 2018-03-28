import Vue from 'vue';
import requestAnimationFrame from 'dom-helpers/util/requestAnimationFrame';
import scrollTop from 'dom-helpers/query/scrollTop';

// 判断是否为服务端渲染
export const isServer = Vue.prototype.$isServer;

export const isTest = process.env.NODE_ENV === 'test';

// 验证十六进制颜色值
export const colorRegex = /#([\da-f]{3}){1,2}/i;

/**
 * 组件 props 验证方法，验证第一个参数是否为第二个参数中的值
 * @param {*} value 需要验证的值
 * @param {array} valueList 可选值的集合
 * @return {boolean}
 */
export function oneOf(value, valueList) {
  return valueList.indexOf(value) > -1;
}

// 滚动条滚动方法（动画效果）
export function scrollTo(element, from, to, duration = 800) {
  const different = Math.abs(from - to);
  const motionStep = Math.ceil((different / duration) * 60);

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

  scroll(from, to, motionStep);
}

let scrollBarWidth;

// 获取滚动条宽度
// 缓存结果方便下次获取
export function getScrollBarWidth() {
  if (isServer) return 0;

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

/**
 * 为指定的 element 元素添加 class
 * @param {Object} element 需要操作的 dom 元素
 * @param {String} className 添加到 dom 元素上的 class
 */
export function addClass(element, className) {
  const el = element;
  const classes = el.className.split(' ');

  classes.push(className);
  el.className = classes.join(' ');
}

/**
 * 为指定的 element 元素移除 class
 * @param {Object} element 需要操作的 dom 元素
 * @param {String} className 移除的 class
 */
export function removeClass(element, className) {
  const el = element;
  const classes = el.className.split(' ');
  const index = classes.indexOf(className);

  if (index > -1) {
    classes.splice(index, 1);
    el.className = classes.join(' ');
  }
}
