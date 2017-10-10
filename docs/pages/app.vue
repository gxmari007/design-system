<template>
  <div id="demo">
    <co-table :data="data" :indent-size="10" hover border @on-cell-click="onClick">
      <co-table-column v-for="(column, index) in columns" :key="index" :label="column.label" :prop="column.prop"></co-table-column>
    </co-table>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      columns: [
        { label: '区／学校', prop: 'name' },
        { label: '分数', prop: 'count' }
      ],
      data: [
        {
          name: '1区',
          count: 100,
          children: [
            { name: '1学校', count: 88 },
            {
              name: '2学校',
              count: 78,
              children: [
                { name: '1班', count: 92 }
              ]
            }
          ]
        },
        {
          name: '2区',
          count: 100,
          children: [
            { name: '3学校', count: 88 },
            { name: '4学校', count: 88 }
          ]
        },
        { name: '3区', count: 90 }
      ]
    };
  },
  methods: {
    onClick(e, row, column) {
      // console.log(e, row, column);
    }
  }
}
</script>

<style lang="less" scoped>
#demo {
  padding: 20px;
}
</style>
