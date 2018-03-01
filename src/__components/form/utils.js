// 根据传入的 path 找到 model 对象中的值
export function getValueByPath(model, path) {
  let obj = model;
  let propPath = path;

  // 这里统一处理传入 path 的不同规则
  // 可能有些习惯 o[prop] 的方式获取属性
  propPath = propPath.replace(/\[(\w+)\]/, '.$1');
  // 去除可能出现在 path 开头的点操作符
  propPath = propPath.replace(/^\./, '');

  const keys = propPath.split('.');
  let prop = '';

  keys.forEach((key, index) => {
    prop = key;

    // 如果 keys 只有一个元素则退出
    // 后面的操作是针对嵌套对象
    if (index === 0) return;

    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      obj = obj[key];
    } else {
      throw new Error('[coview error] Please check that the incoming prop from <co-form-item> is correct!');
    }
  });

  return {
    o: obj,
    k: prop,
    v: obj[prop],
  };
}

export const keep = '';
