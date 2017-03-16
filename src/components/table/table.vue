<template>
  <div :class="classes" :style="styles">
    <!-- 表头 -->
    <div class="co-table__hidden-columns" ref="hiddenColumns">
      <slot></slot>
    </div>
    <div v-if="showHeader" class="co-table__header" ref="header">
      <co-table-header
        :columns="columns"
        :origin-columns="originColumns"
        :col-width="colWidth"
        :sorting-column="sortingColumn"
        :sort-prop="sortProp"
        @sorting-column-change="onSortingColumnChange"
        @no-sort="onNoSort"></co-table-header>
    </div>
    <!-- 内容 -->
    <div class="co-table__body" :style="bodyStyles" ref="body">
      <co-table-body
        v-if="data.length > 0"
        :data="filterData"
        :columns="columns"
        :col-width="colWidth"></co-table-body>
      <!-- 表格为空时的界面 -->
      <div v-else class="co-table__empty">
        <span class="co-table__empty-text">
          <slot v-if="$slots.empty" name="empty"></slot>
          <template v-else>{{ emptyText }}</template>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
// libs
import width from 'dom-helpers/query/width';
import height from 'dom-helpers/query/height';
import listen from 'dom-helpers/events/listen';
import throttle from 'lodash/throttle';
import orderBy from 'lodash/orderBy';
// components
import CoTableHeader from './table-header';
import CoTableBody from './table-body';

import { makeFlattenColumns } from './utils';

const prefixClass = 'co-table';

export default {
  name: 'co-table',
  props: {
    // 数据项
    data: Array,
    // 是否显示条纹间隔
    stripe: {
      type: Boolean,
      default: false,
    },
    // 是否显示单元格边框
    border: {
      type: Boolean,
      default: false,
    },
    // 是否需要鼠标悬浮效果
    hover: {
      type: Boolean,
      default: false,
    },
    // 表格宽度
    width: [String, Number],
    // 表格高度，设置之后会固定表头
    height: [String, Number],
    // 是否显示表头
    showHeader: {
      type: Boolean,
      default: true,
    },
    // 空数据时显示的文本
    // 也可通过 slot="empty" 设置
    emptyText: {
      type: String,
      default: '暂无数据',
    },
  },
  data() {
    return {
      // 原始列
      originColumns: [],
      // 当前排序的列
      sortingColumn: null,
      // 排序列的属性名称
      sortProp: '',
      tableWidth: 0,
      headerHeight: 0,
      resizeOff: null,
    };
  },
  computed: {
    classes() {
      return {
        [prefixClass]: true,
        [`${prefixClass}--stripe`]: this.stripe,
        [`${prefixClass}--border`]: this.border,
        [`${prefixClass}--hover`]: this.hover,
      };
    },
    styles() {
      const { width, height } = this;
      const styles = {};

      if (width) {
        styles.width = `${width}px`;
      }

      if (height) {
        styles.height = `${height}px`;
      }

      return styles;
    },
    bodyStyles() {
      const styles = {};

      if (this.height) {
        styles.height = `${this.height - this.headerHeight - 1}px`;
      }

      return styles;
    },
    // 未设置宽度的列的宽度
    colWidth() {
      let lens = 0;

      // 获取自定义列宽度的总和
      const diyWidth = this.columns.reduce((acc, column) => {
        if (column.width !== undefined) {
          acc += Number(column.width);
          lens += 1;
        }

        return acc;
      }, 0);

      return Math.floor((this.tableWidth - diyWidth) / (this.columns.length - lens));
    },
    // 原始列中没有 children 组成的数组
    columns() {
      return makeFlattenColumns(this.originColumns);
    },
    filterData() {
      const { sortingColumn, sortProp, data } = this;

      if (!sortingColumn || !sortProp) {
        return data;
      }

      return orderBy(data, sortProp, sortingColumn.order);
    },
  },
  watch: {
    // bug: 初始化的时候无法获取高度
    // 需要重新设计
    showHeader() {
      this.computedBodyHeight();
    },
  },
  mounted() {
    this.tableWidth = width(this.$refs.body);
    // 改变窗口大小重新计算表格布局
    this.resizeOff = listen(window, 'resize', throttle(() => {
      this.tableWidth = width(this.$refs.body);
    }, 17));
    this.computedBodyHeight();
  },
  beforeDestroy() {
    if (this.resizeOff) {
      this.resizeOff();
    }
  },
  methods: {
    // 从 co-table-column 添加列信息到 columns
    addColumn(instance, index, parent) {
      let array = this.originColumns;

      if (parent) {
        array = parent.children;

        if (!array) {
          array = parent.children = [];
        }
      }

      if (typeof index !== 'undefined') {
        array.splice(index, 0, instance);
      } else {
        array.push(instance);
      }
    },
    computedBodyHeight() {
      this.$nextTick(() => {
        if (this.showHeader) {
          this.headerHeight = height(this.$refs.header);
        } else {
          this.headerHeight = 0;
        }
      });
    },
    onSortingColumnChange(column) {
      this.sortingColumn = column;
      this.sortProp = column.prop;
    },
    onNoSort() {
      this.sortingColumn = null;
      this.sortProp = '';
    },
  },
  components: {
    CoTableHeader,
    CoTableBody,
  },
};
</script>
