<template>
  <div class="test">
    <co-table :data="data" border :show-header="head" @cell-click="onRowClick" :width="250" :height="300">
      <co-table-column prop="0" label="学校办别" sortable merge-column></co-table-column>
      <co-table-column prop="1" label="类型" sortable overflow-tooltip></co-table-column>
      <co-table-column label="性别">
        <co-table-column label="男">
          <co-table-column label="学生数" prop="3" sortable overflow-tooltip></co-table-column>
        </co-table-column>
        <co-table-column label="女">
          <co-table-column label="学生数" prop="3" overflow-tooltip></co-table-column>
        </co-table-column>
      </co-table-column>
    </co-table>
    <co-button type="primary" @click.native="visible = true">modal</co-button>
    <co-modal v-model="visible" title="标题">
      modal body
    </co-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      head: true,
      columns: ['学校办别', '办学类型', '性别', '学生数'],
      cols: ['学校办别', '办学类型'],
      rows: ['性别'],
      values: ['学生数'],
      data: [
        ['公办', '初中初中初中初中初中初中初中初中初中初中', '男', '123121'],
        ['公办', '初中', '女', '123122'],
        ['公办', '高中', '男', '123123'],
        ['民办', '初中', '男', '123123'],
        ['公办', '高中', '女', '123124'],
        ['公办', '完中', '男', '123125'],
        ['公办', '完中', '女', '123126'],
        ['民办', '初中', '女', '123123'],
        ['民办', '高中', '男', '123123'],
        ['民办', '高中', '女', '123123'],
        ['民办', '完中', '男', '123123'],
        ['民办', '完中', '女', '123123'],
      ],
      visible: false,
    };
  },
  methods: {
    onClick() {
      this.head = !this.head;
    },
    onRowClick(e, row, column) {
      console.log(row);
      console.log(column.label);
    },
  },
};
</script>

<style>
.test {
  padding: 30px;
  height: 2000px;
}
</style>
