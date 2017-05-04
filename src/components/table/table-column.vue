<script>
let id = 1;

export default {
  name: 'co-table-column',
  props: {
    // 对应数据项的属性名称
    prop: String,
    // 实际显示的列名称
    label: String,
    // 自定义列宽度
    width: Number,
    // 列的最小宽度
    // 当 table 宽度有剩余的时候，剩余宽度会平均分配在设置了 min-width 的列上
    minWidth: Number,
    // 排序
    sortable: {
      type: Boolean,
      default: false,
    },
    // 固定此列在左侧或者右侧，默认左侧
    fixed: {
      type: [Boolean, String],
      default: true,
    },
    // 单元格内容过长时添加省略号显示 tooltip 信息
    overflowTooltip: {
      type: Boolean,
      default: false,
    },
    // 合并当前列相同的值
    mergeColumn: {
      type: Boolean,
      default: false,
    },
    displaySetting: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      /*
       * Global values
       */
      columnId: '',
      // 是否为子表头
      isSubColumn: false,
      order: '',
      realWidth: this.width || this.minWidth || 80,
      // 显示设置参数
      display: {
        charLength: 0,
        minLength: 0, // 单元格前多少字符
        minColor: '', // 单元格前多少字符颜色
        maxLength: 0,
        maxColor: '',
        middleValue: '',
        rangeEnabled: false,
        rangeType: '',
        min: 0,
        max: 0,
        rangeColor: '',
      },
    };
  },
  computed: {
    tableParent() {
      let parent = this.$parent;

      while (parent && parent.$options.name !== 'co-table') {
        parent = parent.$parent;
      }

      return parent;
    },
    columnIndex() {
      const parent = this.$parent;

      if (this.isSubColumn) {
        return [].indexOf.call(parent.$el.children, this.$el);
      }

      return [].indexOf.call(parent.$refs.hiddenColumns.children, this.$el);
    },
  },
  created() {
    this.isSubColumn = this.$parent !== this.tableParent;
    this.columnId = `${this.$parent.tableId || this.$parent.columnId}_column_${id += 1}`;
  },
  mounted() {
    const parent = this.$parent;
    let columnIndex = 0;

    if (this.isSubColumn) {
      columnIndex = [].indexOf.call(parent.$el.children, this.$el);
    } else {
      columnIndex = [].indexOf.call(parent.$refs.hiddenColumns.children, this.$el);
    }

    this.tableParent.addColumn(this, columnIndex, this.isSubColumn ? parent : null);

    this.$watch('display.charLength', (newVal) => {
      if (newVal > 0) {
        this.realWidth = (newVal * 12) + 12;
      } else {
        this.realWidth = this.width || this.minWidth || 80;
      }

      this.tableParent.updateLayout();
    });
  },
  render(h) {
    return h('div', this.$slots.default);
  },
};
</script>
