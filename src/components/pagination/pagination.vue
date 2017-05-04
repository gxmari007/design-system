<template>
  <div class="co-pagination">
    <span class="co-pagination__total">共 {{ total }} 条</span>
    <ul class="co-pagination__pages">
      <li
        v-if="prev"
        class="co-pagination__item"
        :class="{ 'co-pagination__item--disabled': activePage === 1 }"
        @click="selectPrev">
        <co-icon type="angle-left"></co-icon>
      </li>
      <template v-for="item in pageButtons">
        <li
          v-if="typeof item === 'number'"
          class="co-pagination__item"
          :class="{ active: activePage === item }"
          @click="selectPage(item)">{{ item }}</li>
        <li v-else class="co-pagination__ellipsis">
          <co-icon type="ellipsis-h"></co-icon>
        </li>
      </template>
      <li
        v-if="next"
        class="co-pagination__item"
        :class="{ 'co-pagination__item--disabled': activePage === pageCount }"
        @click="selectNext">
        <co-icon type="angle-right"></co-icon>
      </li>
    </ul>
  </div>
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
    // 最多显示页码个数
    maxPages: {
      type: Number,
      default: 0,
    },
    // 是否显示前一页按钮
    prev: {
      type: Boolean,
      default: true,
    },
    // 是否显示后一页按钮
    next: {
      type: Boolean,
      default: true,
    },
    // 是否显示省略号
    ellipsis: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      activePage: this.current,
    };
  },
  computed: {
    // 总页数
    pageCount() {
      return Math.ceil(this.total / this.pageSize);
    },
    // 页码按钮数组
    pageButtons() {
      const { activePage, maxPages, pageCount, ellipsis } = this;
      const buttons = [];
      let startPage = 1;
      let endPage = 1;

      if (maxPages && maxPages < pageCount) {
        startPage = Math.max(
          Math.min(activePage - Math.floor(maxPages / 2), (pageCount - maxPages) + 1),
          1,
        );
        endPage = (startPage + maxPages) - 1;
      } else {
        startPage = 1;
        endPage = pageCount;
      }

      for (let page = startPage; page <= endPage; page += 1) {
        buttons.push(page);
      }

      if (ellipsis && startPage > 1) {
        if (startPage > 2) {
          buttons.unshift(ellipsis);
        }

        buttons.unshift(1);
      }

      if (ellipsis && endPage < pageCount) {
        if (endPage < pageCount - 1) {
          buttons.push(ellipsis);
        }

        buttons.push(pageCount);
      }

      return buttons;
    },
  },
  watch: {
    current(newVal) {
      this.activePage = newVal;
    },
    activePage(newVal) {
      this.$emit('page-change', newVal);
    },
  },
  methods: {
    selectPage(page) {
      this.activePage = page;
    },
    selectPrev() {
      if (this.activePage === 1) {
        return;
      }

      this.activePage -= 1;
    },
    selectNext() {
      if (this.activePage === this.pageCount) {
        return;
      }

      this.activePage += 1;
    },
  },
  components: {
    CoIcon,
  },
};
</script>
