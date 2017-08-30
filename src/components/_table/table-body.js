import mixins from './mixins';

export default {
  name: 'table-body',
  mixins: [mixins],
  props: {
    columns: {
      type: Array,
      default() { return []; },
    },
    data: {
      type: Array,
      default() { return []; },
    },
  },
  methods: {
    cellStyles(column) {
      return { textAlign: column.align };
    },
    renderColgroup() {
      const cols = this.columns.map(column => (
        <col style={{ width: `${column.realWidth}px` }} />
      ));

      return <colgroup>{cols}</colgroup>;
    },
    renderRow(row) {
      return this.columns.map((column, index) => (
        <td
          class={this.cellClasses(column, index)}
          style={this.cellStyles(column)}>{column.renderCell({ row, column })}</td>
      ));
    },
    renderTableBody() {
      const rows = this.data.map(row => (
        <tr>
          {this.renderRow(row)}
        </tr>
      ));

      return <tbody>{rows}</tbody>;
    },
  },
  render() {
    return (
      <table class="co-table__body">
        {this.renderColgroup()}
        {this.renderTableBody()}
      </table>
    );
  },
};
