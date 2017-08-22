export default {
  name: 'co-table-column',
  props: {
    label: String,
    prop: [String, Number],
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
  },
  render() {
    return <div>{this.$slots.default}</div>;
  },
};
