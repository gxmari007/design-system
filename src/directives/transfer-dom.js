/**
 * 初始化的时候模态框不显示就不插入到body尾部，如果显示则直接插入body尾部
 */

// 根据传入的 node 参数获取节点对象
// 不传或者传入 true 则返回 body
// 传入字符串则利用 querySelector 去查找元素返回
function getTarget(node = document.body) {
  if (node === true) {
    return document.body;
  }

  return node instanceof window.Node ? node : document.querySelector(node);
}

function getShouldUpdate(node) {
  if (!node) return false;
  return false;
}

export default {
  name: 'transfer-dom',
  inserted(el, { value }) {
    const { parentNode } = el;
    const home = document.createComment('');
    let hasMovedOut = false;

    el.className = el.className ? `${el.className} v-transfer-dom` : 'v-transfer-dom';

    if (value !== false) {
      parentNode.replaceChild(home, el);
      getTarget(value).appendChild(el);
      hasMovedOut = true;
    }

    if (!el.$$transferData) {
      el.$$transferData = {
        parentNode,
        home,
        hasMovedOut,
      };
    }
  },
  componentUpdated(el, { value }) {
    if (!getShouldUpdate(value)) return;

    const { parentNode, home, hasMovedOut } = el.$$transferData;

    if (!hasMovedOut && value) {
      // 绑定的组件没有移动到目标区域但 value 值为真
      parentNode.replaceChild(home, el);
      getTarget(value).appendChild(el);
      el.$$transferData = Object.assign({}, el.$$transferData, { hasMovedOut: true });
    } else if (hasMovedOut && value === false) {
      // 绑定的组件已经移动到目标区域但 value 值变为假
      parentNode.replaceChild(el, home);
      el.$$transferData = Object.assign({}, el.$$transferData, { hasMovedOut: false });
    } else if (value) {
      getTarget(value).appendChild(el);
    }
  },
  unbind(el) {
    const { hasMovedOut, parentNode } = el.$$transferData;

    el.className = el.className.replace('v-transfer-dom', '');

    if (hasMovedOut && parentNode) {
      parentNode.appendChild(el);
    }

    el.$$transferData = null;
  },
};
