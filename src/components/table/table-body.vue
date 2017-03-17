<template>
  <table>
    <colgroup>
      <col v-for="column in columns" :style="setStyles(column.width)">
    </colgroup>
    <tbody>
      <tr v-for="item in currentData" @click="onClick($event, item.row)">
        <td
          v-for="column in columns"
          v-if="column.mergeColumn ? item[`dis-${column.prop}`] : true"
          :rowspan="column.mergeColumn ? item[`span-${column.prop}`] : false"
          :data-id="column.columnId">
          <div class="co-table__cell">{{ item.row[column.prop] }}</div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
// mixins
import mixin from './mixin';

import { mergeColumn, getCellDom, getColumnByCell } from './utils';

export default {
  name: 'co-table-body',
  mixins: [mixin],
  props: {
    data: Array,
    columns: Array,
    colWidth: Number,
  },
  computed: {
    table() {
      return this.$parent;
    },
    // 判断数据列中是否有合并列
    hasMergeColumn() {
      return this.columns.some(column => column.mergeColumn);
    },
    currentData() {
      let data = this.data.map(row => ({ row }));

      if (this.hasMergeColumn) {
        data = mergeColumn(data, this.columns);
      }

      return data;
    },
  },
  methods: {
    // 触发行与单元格的单击事件
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
};
</script>
