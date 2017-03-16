<template>
  <div class="test">
    <co-button @click.native="onClick">switch head</co-button>
    <co-table :data="data" border :show-header="head">
      <co-table-column prop="0" label="学校办别" width="150" sortable></co-table-column>
      <co-table-column prop="1" label="类型" width="180"></co-table-column>
      <co-table-column label="性别">
        <co-table-column label="男">
          <co-table-column label="学生数" prop="3" sortable></co-table-column>
        </co-table-column>
        <co-table-column label="女">
          <co-table-column label="学生数" prop="3"></co-table-column>
        </co-table-column>
      </co-table-column>
    </co-table>
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
        ['公办', '初中', '男', '123121'],
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
    };
  },
  methods: {
    onClick() {
      this.head = !this.head;
    },
  },
};
</script>

<style>
.test {
  padding: 30px;
}
</style>
