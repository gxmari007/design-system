<template>
  <div style="padding: 20px; width: 900px;">
    <!-- <co-table :data="data" :height="300" stripe border hover @on-row-click="onClick">
      <co-table-column
        v-for="(column, index) in columns"
        :key="index"
        :label="column"
        :prop="index + ''"
        header-align="center"></co-table-column>
      <co-table-column :width="150" label="321" prop="0" fixed="left" :sortable="true">
        <template slot="header" scope="props">
          <span>{{ props.label }}</span>
        </template>
      </co-table-column>
    </co-table> -->
    <co-button-group>
      <co-button type="primary">
        <co-icon type="social-markdown" size="14"></co-icon>
        Google Chrome
      </co-button>
      <co-button type="primary">
        <span>前进</span>
        <co-icon type="chevron-right"></co-icon>
      </co-button>
    </co-button-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      columns: ['年龄123', '生日', '生日'],
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
      this.loading = true;

      setTimeout(() => {
        this.loading = false;
      }, 3000);
    },
  },
};
</script>
