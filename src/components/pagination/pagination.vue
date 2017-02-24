<template>
  <ul class="co-pagination">
    <li
      class="co-pagination__prev"
      :class="{ 'co-pagination__prev--disabled': currentPage === 1 }"
      @click="selectPrev">
      <co-icon type="navigate_before"></co-icon>
    </li>
    <li
      class="co-pagination__item"
      :class="{ active: currentPage === index + 1 }"
      v-for="(item, index) in pageCount"
      @click="selectPage(index + 1)">{{ index + 1 }}</li>
    <li
      class="co-pagination__next"
      :class="{ 'co-pagination__next--disabled': currentPage === pageCount }"
      @click="selectNext">
      <co-icon type="navigate_next"></co-icon>
    </li>
  </ul>
</template>

<script>
import CoIcon from 'components/icon';

export default {
  name: 'co-pagination',
  props: {
    // 当前页码
    current: {
      type: Number,
      default: 1,
    },
    // 数据总数
    total: {
      type: Number,
      default: 0,
    },
    // 每页显示个数
    pageSize: {
      type: Number,
      default: 10,
    },
  },
  data() {
    return {
      currentPage: this.current,
    };
  },
  computed: {
    // 页面个数
    pageCount() {
      return Math.ceil(this.total / this.pageSize);
    },
  },
  watch: {
    current(newVal) {
      this.currentPage = newVal;
    },
    currentPage(newVal) {
      this.$emit('page-change', newVal);
    },
  },
  methods: {
    selectPage(page) {
      this.currentPage = page;
    },
    selectPrev() {
      if (this.currentPage === 1) {
        return;
      }

      this.currentPage -= 1;
    },
    selectNext() {
      if (this.currentPage === this.pageCount) {
        return;
      }

      this.currentPage += 1;
    },
  },
  components: {
    CoIcon,
  },
};
</script>
