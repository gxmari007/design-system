// 验证第一个参数是否为第二个参数中的值
export function oneOf(value, valueList) {
  return valueList.some(val => val === value);
}
