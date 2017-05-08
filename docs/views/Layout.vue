<template>
  <div class="test">
    <co-table :data="data" border>
      <co-table-column label="日期" prop="table_1" sortable></co-table-column>
      <co-table-column label="姓名" prop="table_2" sortable></co-table-column>
    </co-table>

    <co-affix :offset-top="20">
      <co-button type="ghost" style="margin-left: 30px;">Button</co-button>
    </co-affix>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: false,
      data: [
        { 'table_1': '空', 'table_2': 10 },
        { 'table_1': '空', 'table_2': 20 },
        { 'table_1': '空', 'table_2': 50 },
        { 'table_1': '空', 'table_2': 40 },
        { 'table_1': '空', 'table_2': 30 },
      ],
    };
  },
  methods: {
    onChange(value) {
      console.log(value);
    },
  },
};
</script>

<style>
.test {
  padding: 80px;
  height: 2000px;
}
</style>
