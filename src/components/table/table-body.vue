<template>
  <table class="co-table__body-table">
    <colgroup>
      <col v-for="column in columns" :style="{ width: `${column.realWidth || column.width}px` }">
    </colgroup>
    <tbody>
      <tr v-for="item in currentData" @click="onClick($event, item.row)">
        <td
          v-for="column in columns"
          v-if="column.mergeColumn ? item[`dis-${column.prop}`] : true"
          :rowspan="column.mergeColumn ? item[`span-${column.prop}`] : false"
          :data-id="column.columnId">
          <!-- 这里需要 tooltip 组件提示，暂时先用原生 title 属性代替 -->
          <div
            :class="cellClasses(column.overflowTooltip)"
            :title="column.overflowTooltip ? item.row[column.prop] : false">{{ item.row[column.prop] }}</div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mergeColumn, getCellDom, getColumnByCell } from './utils';

export default {
  name: 'co-table-body',
  props: {
    data: Array,
    columns: Array,
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
    cellClasses(tooltip) {
      const prefix = 'co-table__cell';

      return {
        [prefix]: true,
        [`${prefix}--tooltip`]: tooltip,
      };
    },
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
