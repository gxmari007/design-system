export default {
  props: {
    flattenColumns: {
      type: Array,
      default() { return []; },
    },
    leftFixedColumns: {
      type: Array,
      default() { return []; },
    },
    rightFixedColumns: {
      type: Array,
      default() { return []; },
    },
  },
  methods: {
    isCellHidden(index) {
      return (index < this.leftFixedColumns.length) ||
        (index >= this.flattenColumns.length - this.rightFixedColumns.length);
    },
    cellClasses(column, index) {
      return [column.columnId, {
        hidden: this.isCellHidden(index),
      }];
    },
  },
};
