<template>
  <div class="test">
    <div style="margin-bottom: 15px;">
      <co-tooltip trigger="focus" placement="top-start" content="测试一下文本">
        <co-button type="ghost">按钮</co-button>
      </co-tooltip>
      <co-popover trigger="focus" placement="bottom" title="还能有标题" content="测试一下 Popover">
        <co-input></co-input>
      </co-popover>
    </div>
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
