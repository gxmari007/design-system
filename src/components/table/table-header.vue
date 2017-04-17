<template>
  <table>
    <colgroup>
      <col v-for="column in columns" :style="{ width: `${column.realWidth || column.width}px` }">
    </colgroup>
    <thead>
      <tr v-for="subColumns in rows">
        <th
          v-for="column in subColumns"
          :colspan="column.colSpan"
          :rowspan="column.rowSpan"
          :data-id="column.columnId">
          <div class="co-table__cell">
            <span>{{ column.label }}</span>
            <span v-if="column.sortable" :class="sortClasses(column)" @click.stop="onSort(column)">
              <i class="co-table__caret co-table__caret--asc" @click.stop="onSort(column, 'asc')"></i>
              <i class="co-table__caret co-table__caret--desc" @click.stop="onSort(column, 'desc')"></i>
            </span>
            <div v-if="column.colSpan === 1" class="co-table__display">
              <co-icon class="co-table__display-icon" type="eye" @click.native="setColumnDisplay(column)"></co-icon>
            </div>
          </div>
        </th>
      </tr>
    </thead>
    <table-display v-if="displayColumn" v-model="display" :column="displayColumn"></table-display>
  </table>
</template>

<script>
// components
import CoIcon from 'components/icon';
import TableDisplay from './table-display';

import { makeRows } from './utils';

export default {
  name: 'co-table-header',
  props: {
    columns: Array,
    originColumns: Array,
    sortingColumn: Object,
    sortProp: String,
  },
  data() {
    return {
      display: false, // 列显示设置窗口开关
      displayColumn: null, // 当前显示设置的列
    };
  },
  computed: {
    rows() {
      return makeRows(this.originColumns);
    },
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
    setColumnDisplay(column) {
      this.displayColumn = column;
      this.$nextTick(() => {
        this.display = true;
      });
    },
  },
  components: {
    CoIcon,
    TableDisplay,
  },
};
</script>
