<template>
  <div style="padding: 20px;">
    <!-- <co-table :data="data">
      <co-table-column
        v-for="(column, index) in columns"
        :key="index"
        :label="column"
        :prop="index"></co-table-column>
    </co-table> -->
    <co-input v-model="model" :maxlength="5"></co-input>
    {{ model }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: 'test',
      columns: ['姓名', '年龄', '生日'],
      data: [
        ['高翔', 29, '1987/10/24'],
        ['俞汝金', 27, '1988/1/25'],
      ],
    };
  },
};
</script>

<style lang="less">
.item {
  height: 100%;
}
</style>
