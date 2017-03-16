<template>
  <table>
    <colgroup>
      <col v-for="column in columns" :style="setStyles(column.width)">
    </colgroup>
    <thead>
      <tr v-for="subColumns in rows">
        <th v-for="column in subColumns" :colspan="column.colSpan" :rowspan="column.rowSpan">
          <div class="co-table__cell">
            {{ column.label }}
            <span v-if="column.sortable" class="co-table__sortable">
              <i class="co-table__caret co-table__caret--ascending"></i>
              <i class="co-table__caret co-table__caret--descending"></i>
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
  },
  computed: {
    rows() {
      return makeRows(this.originColumns);
    },
  },
};
</script>
