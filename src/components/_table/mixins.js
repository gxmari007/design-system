import { oneOf } from '../../utils/help';

export default {
  props: {
    fixed: {
      type: String,
      validator(value) {
        return oneOf(value, ['left', 'right']);
      },
    },
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
      const { fixed, leftFixedColumns, rightFixedColumns, flattenColumns } = this;

      if (fixed === 'left') {
        return index >= leftFixedColumns.length;
      } else if (fixed === 'right') {
        return index < flattenColumns.length - rightFixedColumns.length;
      }

      return (index < leftFixedColumns.length) ||
        (index >= flattenColumns.length - rightFixedColumns.length);
    },
    cellClasses(column, index) {
      return [column.columnId, {
        hidden: this.isCellHidden(index),
      }];
    },
  },
};
