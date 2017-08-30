export default {
  methods: {
    isCellHidden(index) {
      return (index < this.leftFixedColumns.length) || (index >= this.rightFixedColumns.length);
    },
    cellClasses(column, index) {
      return [column.columnId, {
        hidden: this.isCellHidden(index),
      }];
    },
  },
};
