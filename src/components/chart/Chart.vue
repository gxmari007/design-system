<template>
  <echarts :options="options" />
</template>

<script>
import Echarts from 'vue-echarts';

export default {
  name: 'CoChart',
  components: {
    Echarts,
  },
  props: {
    // x 轴
    x: {
      type: Array,
      default: () => [],
    },
    // y 轴
    y: {
      type: Array,
      default: () => [],
    },
    // 原始数据
    dataset: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    options() {
      return {};
    },
  },
};
</script>
