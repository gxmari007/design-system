<template>
  <table>
    <thead>
      <tr>
        <th v-for="item in columns">
          <div class="co-table__cell">{{ item.label }}</div>
        </th>
      </tr>
    </thead>
  </table>
</template>

<script>
export default {
  name: 'co-table-header',
  props: {
    columns: Array,
  },
};
</script>
