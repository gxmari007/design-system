import { getCellDom, getColumnByCell } from './utils';

export default {
  name: 'co-table-body',
  props: {
    data: {
      type: Array,
      default() { return []; },
    },
    columns: {
      type: Array,
      default() { return []; },
    },
  },
  computed: {
    table() {
      return this.$parent;
    },
  },
  methods: {
    renderColgroup() {
      const cols = this.columns.map(column => (
        <col style={{ width: `${column.realWidth}px` }} />
      ));

      return <colgroup>{cols}</colgroup>;
    },
    renderTbody() {
      const rows = this.data.map(row => (
        <tr onClick={$event => this.onClick($event, row)}>
          {this.renderRow(row)}
        </tr>
      ));

      return <tbody>{rows}</tbody>;
    },
    renderRow(row) {
      return this.columns.map(column => (
        <td data-id={column.columnId}>
          {column.renderCell({ row, column })}
        </td>
      ));
    },
    onClick(event, row) {
      this.handleEvent(event, row, 'click');
    },
    handleEvent(event, row, name) {
      const { table } = this;
      const cellDom = getCellDom(event);

      if (cellDom) {
        const column = getColumnByCell(table, cellDom);

        if (column) {
          table.$emit(`cell-${name}`, event, row, column, cellDom);
        }
      }

      table.$emit(`row-${name}`, event, row);
    },
  },
  render() {
    return (
      <table class="co-table__body-table">
        {this.renderColgroup()}
        {this.renderTbody()}
      </table>
    );
  },
};
