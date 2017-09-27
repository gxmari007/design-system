import throttle from 'lodash/throttle';
import CoIcon from '../icon';
import mixins from './mixins';
import { getHeaderRows } from './utils';

export default {
  name: 'table-header',
  mixins: [mixins],
  props: {
    originColumns: {
      type: Array,
      default() { return []; },
    },
    sortingColumn: {
      type: Object,
      default() { return null; },
    },
    scrollY: {
      type: Boolean,
      default: false,
    },
    scrollBarWidth: {
      type: Number,
      default: 0,
    },
    border: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      dragging: false,
      draggingColumn: null,
      dragState: {},
      onMousemoveProxy: null,
    };
  },
  computed: {
    rows() {
      return getHeaderRows(this.originColumns);
    },
  },
  created() {
    this.onMousemoveProxy = throttle(this.onMousemove, 17);
  },
  methods: {
    switchOrder(order) {
      if (!order) {
        return 'asc';
      } else if (order === 'asc') {
        return 'desc';
      }

      return '';
    },
    cellStyles(column) {
      return { textAlign: column.headerAlign || column.align };
    },
    onSort(column) {
      const { sortingColumn } = this;
      const order = this.switchOrder(column.order);

      if (sortingColumn !== column) {
        if (sortingColumn) {
          sortingColumn.order = '';
        }

        this.$emit('sorting-column-change', column);
      }

      if (!order) {
        this.$emit('no-sort');
      }

      column.order = order;
      this.$emit('sort-change');
    },
    onMousedown(event, column) {
      if (column.children && column.children.length > 0) return;
      if (this.draggingColumn && this.border) {
        const table = this.$parent;
        const resizeProxy = table.$refs.resizeProxy;
        const tableLeft = table.$el.getBoundingClientRect().left;
        const columnRect = this.$el.querySelector(`.${column.columnId}`).getBoundingClientRect();
        const minLeft = columnRect.left - tableLeft + 60;

        table.resizeProxyVisible = true;
        this.dragging = true;
        this.dragState = {
          startMouseLeft: event.clientX,
          startLeft: columnRect.right - tableLeft,
          startColumnLeft: columnRect.left - tableLeft,
        };
        resizeProxy.style.left = `${this.dragState.startLeft}px`;

        // 拖动的同时禁用页面选中文本与拖拽功能
        document.onselectstart = () => false;
        document.ondragstart = () => false;

        const onMousemove = throttle((event) => {
          const { startMouseLeft, startLeft } = this.dragState;
          const moveLeft = event.clientX - startMouseLeft;
          const proxyLeft = startLeft + moveLeft;

          resizeProxy.style.left = `${Math.max(proxyLeft, minLeft)}px`;
        }, 17);

        const onMouseup = () => {
          if (this.dragging) {
            const { startColumnLeft } = this.dragState;
            const finalLeft = parseFloat(resizeProxy.style.left);
            const width = finalLeft - startColumnLeft;

            column.resizeWidth = width;
            column.realWidth = width;

            table.doUpdateLayout();

            this.dragging = false;
            this.draggingColumn = null;
            this.dragState = {};
            document.body.style.cursor = '';
            table.resizeProxyVisible = false;
          }

          document.removeEventListener('mousemove', onMousemove);
          document.removeEventListener('mouseup', onMouseup);
          document.onselectstart = null;
          document.ondragstart = null;
        };

        document.addEventListener('mousemove', onMousemove);
        document.addEventListener('mouseup', onMouseup);
      }
    },
    onMousemove(event, column) {
      if (!column || !column.resizable) return;
      if (column.children && column.children.length > 0) return;

      let target = event.target;

      while (target && target.tagName !== 'TH') {
        target = target.parentNode;
      }

      if (!this.dragging && this.border) {
        const rect = target.getBoundingClientRect();
        const bodyStyle = document.body.style;

        if (rect.width > 12 && rect.right - event.pageX < 8) {
          bodyStyle.cursor = 'col-resize';
          this.draggingColumn = column;
        } else {
          bodyStyle.cursor = '';
          this.draggingColumn = null;
        }
      }
    },
    onMouseout() {
      if (!this.dragging) {
        document.body.style.cursor = '';
      }
    },
    renderColgroup() {
      const { scrollY, scrollBarWidth, fixed } = this;
      const cols = this.flattenColumns.map(column => (
        <col style={{ width: `${column.realWidth}px` }} />
      ));

      if (!fixed && scrollY && scrollBarWidth > 0) {
        cols.push(<col style={{ width: `${scrollBarWidth}px` }} />);
      }

      return <colgroup>{cols}</colgroup>;
    },
    renderSort(column) {
      if (column.sortable) {
        const { order } = column;
        const className = 'co-table__icon co-table__sort';

        if (order === '') {
          return (
            <span class={className} onClick={() => this.onSort(column)}>
              <co-icon type="ios-arrow-thin-up"></co-icon>
              <co-icon type="ios-arrow-thin-down"></co-icon>
            </span>
          );
        }

        const type = order === 'asc' ? 'android-arrow-up' : 'android-arrow-down';

        return (
          <co-icon
            class={className}
            type={type}
            nativeOnClick={() => this.onSort(column)}></co-icon>
        );
      }

      return null;
    },
    renderTh(column, index) {
      return (
        <th
          class={this.cellClasses(column, index)}
          style={this.cellStyles(column)}
          colspan={column.colSpan}
          rowspan={column.rowSpan}
          onMousedown={e => this.onMousedown(e, column)}
          onMousemove={e => this.onMousemoveProxy(e, column)}
          onMouseout={this.onMouseout}>
          <div class="co-table__cell">
            {/* <span class="co-table__title">{column.label}</span> */}
            {column.renderHeader(column)}
            {this.renderSort(column)}
          </div>
        </th>
      );
    },
    renderHeader() {
      const { scrollY, scrollBarWidth, fixed } = this;
      const rows = this.rows.map((row) => {
        const ths = row.map(this.renderTh);

        if (!fixed && scrollY && scrollBarWidth > 0) {
          ths.push(<th style={{ width: `${scrollBarWidth}px` }}></th>);
        }

        return <tr>{ths}</tr>;
      });

      return <thead>{rows}</thead>;
    },
  },
  render() {
    return (
      <table class="co-table__header">
        {this.renderColgroup()}
        {this.renderHeader()}
      </table>
    );
  },
  components: {
    CoIcon,
  },
};
