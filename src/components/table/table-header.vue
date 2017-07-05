<template>
  <table>
    <colgroup>
      <col v-for="column in columns" :style="{ width: `${column.realWidth}px` }">
      <col v-if="layout.scrollY" :style="{ width: `${layout.scrollBarWidth}px` }">
    </colgroup>
    <thead>
      <tr v-for="subColumns in rows">
        <th
          v-for="column in subColumns"
          :colspan="column.colSpan"
          :rowspan="column.rowSpan"
          :data-id="column.columnId"
          @mousedown="onMousedown($event, column)"
          @mousemove="onMousemoveProxy($event, column)"
          @mouseout="onMouseout">
          <div class="co-table__cell">
            <span>{{ column.label }}</span>
            <span v-if="column.sortable" :class="sortClasses(column)" @click.stop="onSort(column)">
              <i class="co-table__caret co-table__caret--asc" @click.stop="onSort(column, 'asc')"></i>
              <i class="co-table__caret co-table__caret--desc" @click.stop="onSort(column, 'desc')"></i>
            </span>
            <div v-if="column.colSpan === 1 && column.displaySetting" class="co-table__display" @click="setColumnDisplay(column)">
              <co-icon class="co-table__display-icon" type="eye"></co-icon>
            </div>
          </div>
        </th>
        <th v-if="layout.scrollY" :style="{ width: `${layout.scrollBarWidth}px` }"></th>
      </tr>
    </thead>
  </table>
</template>

<script>
// libs
import throttle from 'lodash/throttle';
// components
import CoIcon from 'components/icon';
// tools
import { makeRows } from './utils';

export default {
  name: 'co-table-header',
  props: {
    layout: Object,
    columns: Array,
    originColumns: Array,
    sortingColumn: Object,
    sortProp: String,
    border: Boolean,
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
      return makeRows(this.originColumns);
    },
  },
  created() {
    this.onMousemoveProxy = throttle(this.onMousemove, 16);
  },
  methods: {
    sortClasses(column) {
      const prefixClass = 'co-table__sortable';

      return {
        [prefixClass]: true,
        [`${prefixClass}--asc`]: column.order === 'asc',
        [`${prefixClass}--desc`]: column.order === 'desc',
      };
    },
    switchOrder(order) {
      if (!order) {
        return 'asc';
      } else if (order === 'asc') {
        return 'desc';
      }

      return '';
    },
    // 根据传入的参数决定排序顺序
    // 没有传递顺序参数则无序、顺序、倒序切换
    onSort(column, givenOrder) {
      const col = column;
      if (!col.sortable) return;

      const { sortingColumn } = this;
      const order = givenOrder || this.switchOrder(col.order);

      if (sortingColumn !== col) {
        if (sortingColumn) {
          sortingColumn.order = '';
        }

        this.$emit('sorting-column-change', col);
      }

      if (!order) {
        this.$emit('no-sort');
      }

      col.order = order;
    },
    onMousedown(e, column) {
      if (column.children && column.children.length > 0) return;
      if (this.draggingColumn && this.border) {
        this.dragging = true;

        const table = this.$parent;
        const resizeProxy = table.$refs.resizeProxy;
        const tableLeft = table.$el.getBoundingClientRect().left;
        const columnRect = document.querySelector(`[data-id=${column.columnId}]`).getBoundingClientRect();
        const minLeft = columnRect.left - tableLeft + 60;

        table.resizeProxyVisible = true;

        this.dragState = {
          startMouseLeft: e.clientX,
          startLeft: columnRect.right - tableLeft,
          startColumnLeft: columnRect.left - tableLeft,
        };

        resizeProxy.style.left = `${this.dragState.startLeft}px`;

        // 拖动的同时禁用页面选中文本与拖拽功能
        document.onselectstart = () => false;
        document.ondragstart = () => false;

        const onMousemove = throttle((event) => {
          const computedLeft = event.clientX - this.dragState.startMouseLeft;
          const proxyLeft = this.dragState.startLeft + computedLeft;

          resizeProxy.style.left = `${Math.max(minLeft, proxyLeft)}px`;
        }, 16);

        const onMouseup = () => {
          if (this.dragging) {
            const { startColumnLeft } = this.dragState;
            const finalLeft = parseInt(resizeProxy.style.left, 10);
            const columnWidth = finalLeft - startColumnLeft;

            column.finalWidth = columnWidth;
            column.realWidth = columnWidth;

            table.updateLayout();

            document.body.style.cursor = '';
            this.dragging = false;
            this.draggingColumn = null;
            this.dragState = {};
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
    onMousemove(e, column) {
      if (column.children && column.children.length > 0) return;

      let target = e.target;

      while (target && target.tagName.toLowerCase() !== 'th') {
        target = target.parentNode;
      }

      if (!this.dragging && this.border) {
        const rect = target.getBoundingClientRect();
        const bodyStyle = document.body.style;

        if (rect.width > 16 && rect.right - e.pageX < 8) {
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
    setColumnDisplay(column) {
      this.$emit('column-display', column);
    },
  },
  components: {
    CoIcon,
  },
};
</script>
