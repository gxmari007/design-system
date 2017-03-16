<template>
  <table>
    <colgroup>
      <col v-for="column in columns" :style="setStyles(column.width)">
    </colgroup>
    <tbody>
      <tr v-for="row in currentData">
        <td
          v-for="column in columns"
          v-if="column.mergeColumn ? row[`dis-${column.prop}`] : true"
          :rowspan="column.mergeColumn ? row[`span-${column.prop}`] : false">
          <div class="co-table__cell">{{ row.row[column.prop] }}</div>
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
};
</script>
