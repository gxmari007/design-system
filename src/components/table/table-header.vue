<template>
  <table>
    <colgroup>
      <col v-for="column in columns" :style="setStyles(column.width)">
    </colgroup>
    <thead>
      <tr v-for="subColumns in rows">
        <th
          v-for="column in subColumns"
          :colspan="column.colSpan"
          :rowspan="column.rowSpan"
          :data-id="column.columnId"
          @click="onThClick(column)">
          <div class="co-table__cell">
            {{ column.label }}
            <span v-if="column.sortable" :class="sortClasses(column)" @click.stop="onSort(column)">
              <i class="co-table__caret co-table__caret--asc" @click.stop="onSort(column, 'asc')"></i>
              <i class="co-table__caret co-table__caret--desc" @click.stop="onSort(column, 'desc')"></i>
            </span>
          </div>
        </th>
      </tr>
    </thead>
  </table>
</template>

<script>
import mixin from './mixin';

import { makeRows } from './utils';

export default {
  name: 'co-table-header',
  mixins: [mixin],
  props: {
    columns: Array,
    originColumns: Array,
    colWidth: Number,
    sortingColumn: Object,
    sortProp: String,
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
    onThClick(column) {
      if (column.sortable) {
        this.onSort(column);
      }
    },
    switchOrder(order) {
      return !order ? 'asc' : order === 'asc' ? 'desc' : '';
    },
    // 根据传入的参数决定排序顺序
    // 没有传递顺序参数则无序、顺序、倒序切换
    onSort(column, givenOrder) {
      if (!column.sortable) return;

      const { sortingColumn } = this;
      const order = givenOrder || this.switchOrder(column.order);

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
    },
  },
};
</script>
