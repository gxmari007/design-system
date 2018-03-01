export default {
  computed: {
    // 左边固定的列
    fixedColumns() {
      return this.originColumns.filter(column => column.fixed === true || column.fixed === 'left');
    },
    // 右边固定的列
    rightFixedColumns() {
      return this.originColumns.filter(column => column.fixed === 'right');
    },
  },
};
