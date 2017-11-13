<template>
  <div id="demo">
    <co-table :data="data" :indent-size="10" hover border>
      <co-table-column v-for="(column, index) in columns" :key="index" :label="column.label" :prop="column.prop"></co-table-column>
    </co-table>
    <co-layout>
      <co-header></co-header>
    </co-layout>
    <!-- <co-spin :spin-show="loading" size="sm" tip="加载中...">
      <div class="example">
        <p>Alert message title</p>
        <p>Further details about the context of this alert.</p>
      </div>
    </co-spin>
    <co-spin :spin-show="loading" tip="加载中...">
      <div class="example">
        <p>Alert message title</p>
        <p>Further details about the context of this alert.</p>
      </div>
    </co-spin>
    <co-spin :spin-show="loading" size="lg" tip="加载中...">
      <div class="example">
        <p>Alert message title</p>
        <p>Further details about the context of this alert.</p>
      </div>
    </co-spin>
    <co-button type="primary" @click.native="loading = !loading">Switch</co-button> -->
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      loading: true,
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
  }
}
</script>

<style lang="less" scoped>
#demo {
  // width: 320px;
  padding: 20px;
}
.example {
  padding: 16px;
  border: 1px solid #d2eafb;
  border-radius: 4px;
  background-color: #ecf6fd;
}
</style>
