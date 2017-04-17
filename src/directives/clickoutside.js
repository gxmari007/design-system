/**
 * v-clickoutside
 * 点击的区域如果不是指令绑定的组件以及它的子元素则调用方法
 */

import Vue from 'vue';
import on from 'dom-helpers/events/on';

let nodes = [];
const ctx = '$$clickoutside';

// 如果是服务器渲染则不绑定事件
// 放在外部绑定事件只需要绑定一次
// 如果放在指令内部则需要多次绑定与解绑
// 这样只需要删除 nodes 列表中相应的 dom 元素即可
!Vue.prototype.$isServer && on(document, 'click', (e) => {
  nodes.forEach(node => node[ctx].onClick(e));
});

export default {
  bind(el, binding, vnode) {
    const index = nodes.push(el) - 1;

    function onClick(e) {
      if (el.contains(e.target) ||
        (vnode.context.popperElm &&
        vnode.context.popperElm.contains(e.target))) {
        return false;
      }

      if (binding.expression &&
        el[ctx].methodName &&
        vnode.context[el[ctx].methodName]) {
        vnode.context[el[ctx].methodName]();
      } else {
        el[ctx].bindingFn && el[ctx].bindingFn();
      }
    }

    el[ctx] = {
      index,
      onClick,
      methodName: binding.expression,
      bindingFn: binding.value,
    };
  },
  update(el, binding) {
    el[ctx].methodName = binding.expression;
    el[ctx].bindingFn = binding.value;
  },
  unbind(el) {
    const ctxIndex = el[ctx].index;

    for (let i = 0, len = nodes.length; i < len; i++) {
      if (nodes[i][ctx].index === ctxIndex) {
        nodes.splice(i, 1);
        break;
      }
    }
  },
};
