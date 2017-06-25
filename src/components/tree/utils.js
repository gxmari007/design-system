export default function setChildren(childs, value) {
  childs.forEach((child) => {
    if (child.childs.length > 0) {
      setChildren(child.childs, value);
    } else {
      child.checked = value;
    }
  });
}
