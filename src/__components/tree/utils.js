// 设置子节点的 checked 值
export function setChildren(childs, value) {
  childs.forEach((child) => {
    if (child.childs.length > 0) {
      setChildren(child.childs, value);
    } else {
      child.checked = value;
    }
  });
}

// 判断当前节点是否展开
export function isExpand(data, key, childKey, keys, auto) {
  if (keys.indexOf(data[key]) > -1) {
    return true;
  }

  const children = data[childKey];

  if (auto && children && children.length > 0) {
    return children.some(child => isExpand(child, key, childKey, keys, auto));
  }

  return false;
}
