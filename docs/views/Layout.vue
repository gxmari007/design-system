<template>
  <div style="padding: 20px;">
    <co-table :data="data" :height="300" border>
      <co-table-column label="姓名" prop="0"></co-table-column>
      <co-table-column label="年龄" prop="1" fixed="left" :sortable="true"></co-table-column>
      <co-table-column label="生日" prop="2"></co-table-column>
    </co-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      columns: ['姓名', '年龄', '生日'],
      data: [
        ['高翔', 50, '1987/10/24'],
        ['高翔', 27, '1988/1/25'],
        ['高翔', 29, '1987/10/24'],
        ['高翔', 27, '1988/1/25'],
        ['高翔', 29, '1987/10/24'],
        ['高翔', 27, '1988/1/25'],
        ['高翔', 29, '1987/10/24'],
        ['高翔', 27, '1988/1/25'],
        ['高翔', 29, '1987/10/24'],
        ['高翔', 27, '1988/1/25'],
        ['高翔', 29, '1987/10/24'],
        ['高翔', 27, '1988/1/25'],
        ['高翔', 29, '1987/10/24'],
        ['高翔', 27, '1988/1/25'],
        ['高翔', 29, '1987/10/24'],
        ['高翔', 27, '1988/1/25'],
        ['高翔', 29, '1987/10/24'],
        ['高翔', 27, '1988/1/25'],
      ],
    };
  },
};
</script>
