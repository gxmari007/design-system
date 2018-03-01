import ExpandIcon from './expand-icon';

export default {
  name: 'table-cell',
  props: {
    row: Object,
    column: Object,
    indent: Number,
    indentSize: Number,
    hasExpandIcon: Boolean,
    expandable: Boolean,
    isNeedIndent: Boolean,
    expanded: Boolean,
    index: Number,
    cellClasses: Function,
  },
  methods: {
    cellStyles(column) {
      return { textAlign: column.align };
    },
    renderExpandIcon() {
      const { row, expandable, isNeedIndent, expanded } = this;

      return this.hasExpandIcon ?
        <expand-icon
          row={row}
          expandable={expandable}
          isNeedIndent={isNeedIndent}
          expanded={expanded}></expand-icon> :
        null;
    },
  },
  render() {
    const { row, column, hasExpandIcon, indent, indentSize, index } = this;
    const indentHolder = hasExpandIcon ?
      <span style={{ paddingLeft: `${indent * indentSize}px` }}></span> :
      null;

    return (
      <td class={this.cellClasses(column, index)} style={this.cellStyles(column)}>
        <div class="co-table__cell" style={column.styles}>
          {indentHolder}
          {this.renderExpandIcon()}
          {column.renderCell({ row, column })}
        </div>
      </td>
    );
  },
  components: {
    ExpandIcon,
  },
};
