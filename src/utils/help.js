import requestAnimationFrame from 'dom-helpers/util/requestAnimationFrame';
import scrollTop from 'dom-helpers/query/scrollTop';

// 验证第一个参数是否为第二个参数中的值
export function oneOf(value, valueList) {
  return valueList.some(val => val === value);
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
