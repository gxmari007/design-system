import mixins from './mixins';

export default {
  name: 'table-body',
  mixins: [mixins],
  props: {
    data: {
      type: Array,
      default() { return []; },
    },
    hover: Boolean,
    hoverIndex: null,
  },
  methods: {
    rowClasses(index) {
      return {
        hover: this.hover && this.hoverIndex === index,
      };
    },
    cellStyles(column) {
      return { textAlign: column.align };
    },
    onMouseenter(index) {
      if (this.hover) {
        this.$emit('hover-in', index);
      }
    },
    onMouseleave() {
      if (this.hover) {
        this.$emit('hover-out', null);
      }
    },
    renderColgroup() {
      const cols = this.flattenColumns.map(column => (
        <col style={{ width: `${column.realWidth}px` }} />
      ));

      return <colgroup>{cols}</colgroup>;
    },
    renderRow(row) {
      return this.flattenColumns.map((column, index) => (
        <td
          class={this.cellClasses(column, index)}
          style={this.cellStyles(column)}>{column.renderCell({ row, column })}</td>
      ));
    },
    renderBody() {
      const rows = this.data.map((row, index) => (
        <tr
          class={this.rowClasses(index)}
          onMouseenter={() => this.onMouseenter(index)}
          onMouseleave={this.onMouseleave}>{this.renderRow(row)}</tr>
      ));

      return <tbody>{rows}</tbody>;
    },
  },
  render() {
    return (
      <table class="co-table__body">
        {this.renderColgroup()}
        {this.renderBody()}
      </table>
    );
  },
};
