import TableCell from './table-cell';

export default {
  name: 'table-row',
  props: {
    row: Object,
    columns: Array,
    visible: Boolean,
    indent: Number,
    indentSize: Number,
    expandable: Boolean,
    isNeedIndent: Boolean,
    expanded: Boolean,
  },
  data() {
    return {
      expandColumnIndex: 0, // 展开图标的位置
    };
  },
  methods: {
    renderCells() {
      const {
        row,
        columns,
        indent,
        indentSize,
        expandable,
        isNeedIndent,
        expandColumnIndex,
        expanded,
      } = this;

      return columns.map((column, index) => (
        <table-cell
          row={row}
          column={column}
          indent={indent}
          indentSize={indentSize}
          hasExpandIcon={index === expandColumnIndex}
          expandable={expandable}
          isNeedIndent={isNeedIndent}
          expanded={expanded}></table-cell>
      ));
    },
  },
  render() {
    return <tr v-show={this.visible}>{this.renderCells()}</tr>;
  },
  components: {
    TableCell,
  },
};
