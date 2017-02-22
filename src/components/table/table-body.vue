<template>
  <table>
    <colgroup>
      <col v-for="column in columns" :style="setStyles(column.width)">
    </colgroup>
    <tbody>
      <tr v-for="(item, index) in data" :key="index">
        <td v-for="(column, index) in columns" :key="index">
          <div class="co-table__cell">{{ item[column.prop] }}</div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
// mixins
import mixin from './mixin';

export default {
  name: 'co-table-body',
  mixins: [mixin],
  props: {
    data: Array,
    columns: Array,
    colWidth: Number,
  },
};
</script>
