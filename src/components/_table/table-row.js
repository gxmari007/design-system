export default {
  name: 'table-row',
  props: {
    row: Object,
    columns: Array,
    visible: Boolean,
    indent: Number,
    indentSize: Number,
    expandable: Boolean,
  },
  data() {
    return {
      expandColumnIndex: 0, // 展开图标的位置
    };
  },
};
