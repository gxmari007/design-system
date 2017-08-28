export default {
  name: 'table-body',
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
    renderColgroup() {
      const cols = this.columns.map(column => (
        <col style={{ width: `${column.realWidth}px` }} />
      ));

      return <colgroup>{cols}</colgroup>;
    },
    renderRow(row) {
      return this.columns.map(column => (
        <td>{column.renderCell({ row, column })}</td>
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
