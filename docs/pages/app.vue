<template>
  <div id="demo">
    <!-- <co-table :data="data" :indent-size="10" hover border @on-cell-click="onClick">
      <co-table-column v-for="(column, index) in columns" :key="index" :label="column.label" :prop="column.prop"></co-table-column>
    </co-table> -->
    <co-dropdown placement="bottom-start">
      <co-button @click.native="visible = !visible">下拉</co-button>
      <co-dropdown-menu slot="menu">
        <co-dropdown-item>item</co-dropdown-item>
        <co-dropdown-item>item</co-dropdown-item>
        <co-dropdown-item>item</co-dropdown-item>
        <co-dropdown placement="right-start">
          <co-dropdown-item>slide</co-dropdown-item>
          <co-dropdown-menu slot="menu">
            <co-dropdown-item>item</co-dropdown-item>
            <co-dropdown-item>item</co-dropdown-item>
            <co-dropdown-item>item</co-dropdown-item>
            <co-dropdown placement="right-start">
              <co-dropdown-item>slide</co-dropdown-item>
              <co-dropdown-menu slot="menu">
                <co-dropdown-item>item</co-dropdown-item>
                <co-dropdown-item>item</co-dropdown-item>
                <co-dropdown-item>item</co-dropdown-item>
              </co-dropdown-menu>
            </co-dropdown>
          </co-dropdown-menu>
        </co-dropdown>
      </co-dropdown-menu>
    </co-dropdown>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      visible: true,
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
  padding: 20px;
}
</style>
