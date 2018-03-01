export const colors = {
  values: [
    { name: '红', value: { bg: '#d96060', font: '#fff' } },
    { name: '橙', value: { bg: '#ea9d4a', font: '#fff' } },
    { name: '黄', value: { bg: '#f9df78', font: '#333' } },
    { name: '绿', value: { bg: '#6aab70', font: '#fff' } },
    { name: '青', value: { bg: '#3ebcb8', font: '#fff' } },
    { name: '蓝', value: { bg: '#4e97c8', font: '#fff' } },
    { name: '紫', value: { bg: '#987bb4', font: '#fff' } },
  ],
  findColor(name) {
    const result = this.values.filter(value => value.name === name);

    if (result.length > 0) {
      return result[0].value;
    }

    return null;
  },
};

export const keep = '';
