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
  },
  computed: {
    tableParent() {
      let parent = this.$parent;

      while (parent && parent.$options.componentName !== 'co-table') {
        parent = parent.$parent;
      }

      return parent;
    },
  },
  created() {
    this.tableParent.addColumn(this);
  },
  render(h) {
    return h('div', this.$slots.default);
  },
};
</script>
