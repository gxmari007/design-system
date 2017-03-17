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
          :rowspan="column.mergeColumn ? item[`span-${column.prop}`] : false">
          <div class="co-table__cell">{{ item.row[column.prop] }}</div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
// mixins
import mixin from './mixin';

import { mergeColumn } from './utils';

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
    // 这里会触发
    onClick(e, row) {
      this.handleEvent(e, row, 'click');
    },
    handleEvent(e, row, name) {
      const { table } = this;

      table.$emit(`row-${name}`, e, row);
    },
  },
};
</script>
