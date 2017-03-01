<template>
  <div class="test">
    <co-table :data="data" border>
      <co-table-column prop="name" label="姓名" width="100"></co-table-column>
      <co-table-column prop="age" label="年龄"></co-table-column>
      <co-table-column prop="date" label="日期"></co-table-column>
    </co-table>
    <co-pagination
      :current="page"
      :total="200"
      :max-pages="5"
      ellipsis
      @page-change="onPageChange"></co-pagination>
    <co-tabs active-name="tab3">
      <co-tab-pane name="tab1" label="数字">tab 1 content</co-tab-pane>
      <co-tab-pane name="tab2" label="标题">tab 2 content</co-tab-pane>
      <co-tab-pane name="tab3" label="参考线">tab 3 content</co-tab-pane>
    </co-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      page: 2,
      data: [
        {
          name: '小明',
          age: 20,
          date: '2017-01-20',
        },
        {
          name: '小王',
          age: 18,
          date: '2017-03-11',
        },
        {
          name: '小二',
          age: 22,
          date: '2017-01-11',
        },
        {
          name: '小明',
          age: 20,
          date: '2017-01-20',
        },
        {
          name: '小王',
          age: 18,
          date: '2017-03-11',
        },
        {
          name: '小二',
          age: 22,
          date: '2017-01-11',
        },
      ],
      dataset: [
        ['公办', '初中', '123123'],
        ['公办', '高中', '123123'],
        ['公办', '完中', '123123'],
        ['民办', '初中', '123123'],
        ['民办', '高中', '123123'],
      ],
      result: [
        {
          name: '公办',
          categories: ['初中', '高中', '完中'],
        },
        {
          name: '民办',
          categories: ['初中', '高中'],
        },
      ],
    };
  },
  methods: {
    onPageChange(page) {
      this.page = page;
    },
  },
};
</script>

<style>
.test {
  height: 800px;
  padding: 100px;
}
</style>
