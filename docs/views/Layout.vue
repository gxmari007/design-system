<template>
  <div style="padding: 20px;">
    <!-- <co-table :data="data" :height="300" border>
      <co-table-column label="姓名" prop="0"></co-table-column>
      <co-table-column label="年龄" prop="1" :sortable="true"></co-table-column>
      <co-table-column label="生日" prop="2" :sortable="true"></co-table-column>
    </co-table> -->
    <co-carousel :duration="0">
      <co-carousel-item>
        <div class="demo" style="background-color: orange;"></div>
      </co-carousel-item>
      <co-carousel-item>
        <div class="demo" style="background-color: red;"></div>
      </co-carousel-item>
    </co-carousel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: 'test',
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

<style lang="less">
.demo {
  height: 260px;
}
</style>
