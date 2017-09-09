<template>
  <div style="padding: 20px;">
    <!-- <co-table :data="data" :height="300" stripe border hover>
      <co-table-column
        v-for="(column, index) in columns"
        :key="index"
        :label="column"
        :prop="index + ''"
        header-align="center"></co-table-column>
      <co-table-column :width="150" label="左侧固定列" prop="0" fixed="left" :sortable="true"></co-table-column>
    </co-table> -->
    <co-button type="primary" :loading="loading" @click.native="onClick">{{ text }}</co-button>
    <co-button type="ghost">按钮</co-button>
    <co-button>按钮</co-button>
    <co-button type="success">按钮</co-button>
    <co-button type="error">按钮</co-button>
    <co-button type="link">链接</co-button>
    <hr>
    <co-button type="primary" size="sm">Button</co-button>
    <co-button type="primary">Button</co-button>
    <co-button type="primary" size="lg">Button 按钮</co-button>
    <hr>
    <co-button-group>
      <co-button type="primary">
        <co-icon type="plus"></co-icon>
        新增
      </co-button>
      <co-button type="primary">
        <co-icon type="ios-checkmark-outline"></co-icon>
        启用
      </co-button>
      <co-button type="primary">
        <co-icon type="edit"></co-icon>
        编辑
      </co-button>
    </co-button-group>
    <hr>
    <co-button-group vertical>
      <co-button type="error">
        <co-icon type="plus"></co-icon>
        新增
      </co-button>
      <co-button type="error">
        <co-icon type="ios-checkmark-outline"></co-icon>
        启用
      </co-button>
      <co-button type="error">
        <co-icon type="edit"></co-icon>
        编辑
      </co-button>
    </co-button-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: '确定',
      loading: false,
      columns: ['年龄', '生日', '生日', '生日', '生日', '生日'],
      data: [
        ['高翔', 50, '上海市普陀区金'],
        ['高翔', 27, '1988/1/25'],
        ['高翔', 29, '1987/10/24'],
        ['高翔', 27, '1988/1/25'],
        ['高翔', 29, '1987/10/24'],
        ['高翔', 27, '1988/1/25'],
        ['高翔', 29, '1987/10/24'],
        ['高翔', 27, '1988/1/25'],
        ['高翔', 29, '1987/10/24'],
        ['高翔', 27, '1988/1/25'],
        ['高翔', 29, '1987/10/24'],
        ['高翔', 27, '1988/1/25'],
        ['高翔', 29, '1987/10/24'],
        ['高翔', 27, '1988/1/25'],
        ['高翔', 29, '1987/10/24'],
        ['高翔', 27, '1988/1/25'],
        ['高翔', 29, '1987/10/24'],
        ['高翔', 27, '1988/1/25'],
      ],
    };
  },
  methods: {
    onClick() {
      if (this.loading) return;

      this.text = '加载...';
      this.loading = true;

      setTimeout(() => {
        this.loading = false;
        this.text = '确定';
      }, 3000);
    },
  },
};
</script>
