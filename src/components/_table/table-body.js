import mixins from './mixins';
import { getCellDom, getColumnByCell } from './utils';

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
    rowKey: {
      type: [String, Function],
      default: 'key',
    },
    defaultExpandAll: {
      type: Boolean,
      default: false,
    },
    expandRowKeys: Array,
  },
  computed: {
    table() {
      return this.$parent;
    },
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
    handleEvent(event, row, eventName) {
      const cell = getCellDom(event);
      let column = null;

      if (cell) {
        column = getColumnByCell(this.flattenColumns, cell);

        if (column) {
          this.table.$emit(`on-cell-${eventName}`, event, row, column, cell);
        }
      }

      this.table.$emit(`on-row-${eventName}`, event, row, column);
    },
    onClick(event, row) {
      this.handleEvent(event, row, 'click');
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
    // 获取
    getRowKey(record, index) {
      const { rowKey } = this;
      const key = typeof rowKey === 'function' ? rowKey(record, index) : record[rowKey];

      return typeof key === 'undefined' ? index : key;
    },
    // 判断表格行是否展开
    isRowExpand(record, index) {
      // this.table.expandRowKeys.filter(key => key);
    },
    // 获取表格行数组
    getRowsByData(data, visible, indent) {
      let rows = [];
      const { childrenColumnName } = this.table;

      data.forEach((record, index) => {
        const childrenColumn = record[childrenColumnName];
        const isRowExpand = this.isRowExpand(record, index);

        rows.push(this.renderRow(record));

        const subVisble = visible && isRowExpand;

        if (childrenColumn) {
          rows = rows.concat(this.renderRows(childrenColumn, subVisble, indent + 1));
        }
      });

      // const rows = this.data.map((row, index) => (
      //   <tr
      //     class={this.rowClasses(index)}
      //     onClick={e => this.onClick(e, row)}
      //     onMouseenter={() => this.onMouseenter(index)}
      //     onMouseleave={this.onMouseleave}>{this.renderRow(row)}</tr>
      // ));

      return rows;
    },
  },
  render() {
    const rows = this.getRowsByData(this.data, true, 0);

    return (
      <table class="co-table__body">
        {this.renderColgroup()}
        <tbody>{rows}</tbody>
      </table>
    );
  },
};
