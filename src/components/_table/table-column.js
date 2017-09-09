import { oneOf } from 'utils/help';

let id = 0;

export default {
  name: 'co-table-column',
  props: {
    // 显示的列标题
    label: String,
    // 对应列内容的字段名
    prop: String,
    // 对齐方式
    align: {
      type: String,
      default: 'left',
      validator(value) {
        return oneOf(value, ['left', 'center', 'right']);
      },
    },
    // 表头对齐方式，没有设置则按 align 属性默认值设置
    headerAlign: {
      type: String,
      validator(value) {
        return oneOf(value, ['left', 'center', 'right']);
      },
    },
    // 列的固定宽度
    width: Number,
    // 列的最小宽度，多出的宽度会平均分配在设置了 min-width 的列上
    minWidth: Number,
    // 列的默认最小宽度，当 width 与 min-width 都没有设置时此属性生效
    defaultMinWidth: {
      type: Number,
      default: 80,
    },
    // 对应列是否可以排序
    sortable: {
      type: [Boolean, String],
      default: false,
      validator(value) {
        return oneOf(value, [true, false, 'custom']);
      },
    },
    // 对应列进行排序的时候使用的方法，sortable 为 true 时才执行
    sortMethod: Function,
    // 列是否可以拖动改变宽度（只有在表格 border 属性为真的情况下有效）
    resizable: {
      type: Boolean,
      default: true,
    },
    // 是否固定列在左侧或者右侧
    fixed: {
      type: String,
      validator(value) {
        return oneOf(value, ['left', 'right']);
      },
    },
  },
  data() {
    return {
      // 拖拽调整的宽度
      resizeWidth: null,
      // 渲染的实际宽度
      realWidth: this.width || this.minWidth || this.defaultMinWidth,
      order: '',
      columnId: '',
    };
  },
  computed: {
    table() {
      let parent = this.$parent;

      while (parent && parent.$options.name !== 'co-table') {
        parent = parent.$parent;
      }

      return parent;
    },
    isSubColumn() {
      return this.$parent !== this.table;
    },
    styles() {
      return { textAlign: this.align };
    },
  },
  watch: {
    width(newVal) {
      // 当 width 参数更新时，重置拖拽宽度
      this.resizeWidth = null;
      this.realWidth = newVal;
      this.table.doUpdateLayout();
    },
    minWidth() {
      this.resizeWidth = null;
      this.table.doUpdateLayout();
    },
  },
  created() {
    const parent = this.$parent;

    this.columnId = `${parent.tableId || parent.columnId}_column_${id += 1}`;
  },
  mounted() {
    this.table.columnChange();

    if (this.table.defaultSort) {
      const { prop, order } = this.table.defaultSort;

      if (prop === this.prop) {
        this.order = order || this.order;
        this.table.sortingColumn = this;
        this.table.sortProp = prop;
      }
    }
  },
  beforeDestroy() {
    this.table.columnChange();
  },
  methods: {
    renderDefaultCell({ row, column }) {
      return row[column.prop];
    },
    renderCell(data) {
      const cell = this.$scopedSlots.default ?
        this.$scopedSlots.default(data) :
        this.renderDefaultCell(data);

      return <div class="co-table__cell" style={this.styles}>{cell}</div>;
    },
  },
  render() {
    return <div>{this.$slots.default}</div>;
  },
};
