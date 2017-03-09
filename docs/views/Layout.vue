<template>
  <div class="test">
    <co-table :data="data" border>
      <co-table-column v-for="(column, index) in columns" :prop="index" :label="column"></co-table-column>
    </co-table>
    <co-timeline pending>
      <co-timeline-item>2016/7/1</co-timeline-item>
      <co-timeline-item color="red">
        <div>2016/7/2</div>
        <div>2016/7/3</div><div>2016/7/2</div>
        <div>2016/7/3</div>
      </co-timeline-item>
      <co-timeline-item color="green">
        <div>2016/7/2</div>
        <div>2016/7/3</div>
        <div>2016/7/2</div>
        <div>2016/7/3</div>
        <div>2016/7/2</div>
        <div>2016/7/3</div>
      </co-timeline-item>
      <co-timeline-item><a href="#">更多选项</a></co-timeline-item>
    </co-timeline>
  </div>
</template>

<script>
export default {
  data() {
    return {
      columns: ['学校办别', '类型', '性别', '学生数'],
      data: [
        ['公办', '初中', '男', 125123],
        ['公办', '初中', '女', 83712],
        ['公办', '高中', '男', 821981],
        ['公办', '高中', '女', 812373],
        ['公办', '完中', '男', 1243],
        ['公办', '完中', '女', 281234],
        ['民办', '初中', '男', 125123],
        ['民办', '初中', '女', 83712],
        ['民办', '高中', '男', 821981],
        ['民办', '高中', '女', 812373],
        ['民办', '完中', '男', 1243],
        ['民办', '完中', '女', 281234],
      ],
    };
  },
};
</script>

<style>
.test {
  padding: 50px;
}
</style>
