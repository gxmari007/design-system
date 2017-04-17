<template>
  <div class="test">
    <co-table :data="data" border :default-sort="{ prop: '1', order: 'desc' }">
      <co-table-column label="test">
        <co-table-column label="日期" prop="0" sortable></co-table-column>
        <co-table-column label="姓名" prop="1" sortable></co-table-column>
        <co-table-column label="test">
          <co-table-column label="地址" prop="2"></co-table-column>
          <co-table-column label="标签" prop="3"></co-table-column>
        </co-table-column>
      </co-table-column>
    </co-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: true,
      text: '',
      data: [
        ['2017-1-3', '王五', '上海市普陀区金沙江路 1518 弄', 1234],
        ['2017-1-2', '李四', '上海市普陀区金沙江路 1518 弄', 51252],
        ['2017-1-1', '张三', '上海市普陀区金沙江路 1518 弄', 8221],
        ['2017-1-4', '王五', '上海市普陀区金沙江路 1518 弄', 37214],
      ],
    };
  },
};
</script>

<style>
.test {
  padding: 80px;
  height: 2000px;
}
</style>
