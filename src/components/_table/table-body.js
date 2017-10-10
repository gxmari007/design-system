import TableRow from './table-row';
import mixins from './mixins';
import { getCellDom, getColumnByCell, getFlattenRows } from './utils';

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
    rowKey: [String, Function],
    // 是否默认展开所有表格行，只在具有展开行功能的表格中有效
    defaultExpandAll: Boolean,
    // 设置表格展开行，需要设置 rowKey 属性才有效，其值为展开行的 keys 数组
    expandRowKeys: Array,
    // 表格子列的属性名
    childrenColumnName: String,
    indentSize: Number,
  },
  data() {
    return {
      expandRows: this.getExpandRows(),
    };
  },
  computed: {
    table() {
      return this.$parent;
    },
    isNeedIndent() {
      const { data, childrenColumnName } = this;

      return data.some(row => row[childrenColumnName]);
    },
  },
  created() {
    this.$on('on-expanded', this.onExpanded);
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
    // renderRow(row) {
    //   return this.flattenColumns.map((column, index) => (
    //     <td
    //       class={this.cellClasses(column, index)}
    //       style={this.cellStyles(column)}>{column.renderCell({ row, column })}</td>
    //   ));
    // },
    getExpandRows() {
      let expandRows = [];
      const { defaultExpandAll, expandRowKeys, rowKey } = this;
      const rows = getFlattenRows(this.data, this.childrenColumnName);

      if (expandRowKeys) {
        if (!rowKey) throw new Error('[co-table] prop row-key should be set!');

        const keysMap = this.getKeysMap(rows, rowKey);

        expandRowKeys.forEach((key) => {
          const row = keysMap[key];

          if (row) {
            expandRows.push(row);
          }
        });
      } else if (defaultExpandAll) {
        expandRows = [...rows];
      }

      return expandRows;
    },
    // 获取行数据的 key 值
    getRowKey(row, rowKey) {
      return typeof rowKey === 'function' ? rowKey(row) : row[rowKey];
    },
    // 获取 rows 中每个元素以 rowKey 值为属性名的对象映射
    getKeysMap(rows, rowKey) {
      const map = {};

      rows.forEach((row) => {
        map[this.getRowKey(row, rowKey)] = row;
      });

      return map;
    },
    // 判断表格行是否展开
    isRowExpand(row) {
      return this.expandRows.indexOf(row) > -1;
    },
    // 获取表格行数组
    getRowsByData(data, visible, indent) {
      let rows = [];
      const {
        childrenColumnName,
        flattenColumns,
        indentSize,
        isNeedIndent,
      } = this;

      data.forEach((row) => {
        const childrenColumn = row[childrenColumnName];
        const isRowExpand = this.isRowExpand(row);

        rows.push(
          <table-row
            row={row}
            columns={flattenColumns}
            visible={visible}
            indent={indent}
            indentSize={indentSize}
            expandable={!!childrenColumn}
            isNeedIndent={isNeedIndent}
            expanded={isRowExpand}></table-row>,
        );

        const subVisble = visible && isRowExpand;

        if (childrenColumn) {
          rows = rows.concat(this.getRowsByData(childrenColumn, subVisble, indent + 1));
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
    onExpanded(expanded, row) {
      const hasExpand = this.isRowExpand(row);

      if (hasExpand && !expanded) {
        this.expandRows = this.expandRows.filter(record => row !== record);
      } else if (!hasExpand && expanded) {
        this.expandRows.push(row);
      }
    },
  },
  render() {
    const rows = this.getRowsByData(this.data, true, 0);

    return (
      <table class="co-table__body">
        {this.renderColgroup()}
        {<tbody>{rows}</tbody>}
      </table>
    );
  },
  components: {
    TableRow,
  },
};
