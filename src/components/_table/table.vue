<template>
  <div class="co-table">
    <div class="co-table__hidden-columns">
      <slot></slot>
    </div>
    <div v-if="showHeader" class="co-table__header-wrap">
      <table-header></table-header>
    </div>
    <div class="co-table__body-wrap">
      <div v-if="noData" class="co-table__empty-body">
        <span class="co-table__empty-text">
          <slot name="empty">{{ emptyText }}</slot>
        </span>
      </div>
      <table-body v-else></table-body>
    </div>
  </div>
</template>

<script>
import TableHeader from './table-header';
import TableBody from './table-body';

export default {
  name: 'co-table',
  props: {
    // 显示的数据
    data: {
      type: Array,
      default() { return []; },
    },
    // 表格高度（单位：px），如果表格实际高度大于此值，则会固定表头
    height: {
      type: [String, Number],
      default: 'auto',
      validator(value) {
        return value === 'auto' || typeof value === 'number';
      },
    },
    // 是否显示表格斑马纹
    stripe: {
      type: Boolean,
      default: false,
    },
    // 是否显示表格纵向边框
    border: {
      type: Boolean,
      default: false,
    },
    // 数据为空时显示的文本内容，也可通过 slot="empty" 设置
    emptyText: {
      type: String,
      default: '暂无数据',
    },
    // 是否显示表头
    showHeader: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    noData() {
      return this.data.length === 0;
    },
  },
  components: {
    TableHeader,
    TableBody,
  },
};
</script>
