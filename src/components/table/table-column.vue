<script>
export default {
  name: 'co-table-column',
  props: {
    // 对应数据项的属性名称
    prop: String,
    // 实际显示的列名称
    label: String,
    // 自定义列宽度
    width: [String, Number],
    // 排序
    sortable: {
      type: Boolean,
      default: false,
    },
    // 合并当前列相同的值
    mergeColumn: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      /*
       * Global values
       */
      // 是否为子表头
      isSubColumn: false,
      order: '',
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
  },
  render(h) {
    return h('div', this.$slots.default);
  },
};
</script>
