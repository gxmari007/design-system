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
        :sorting-column="sortingColumn"
        :sort-prop="sortProp"
        :style="{ width: layout.bodyWidth ? `${layout.bodyWidth}px` : '' }"
        @sorting-column-change="onSortingColumnChange"
        @no-sort="onNoSort"></co-table-header>
    </div>
    <!-- 内容 -->
    <div class="co-table__body" :style="bodyStyles" ref="body" @scroll="onBodyScroll">
      <table-body
        v-if="data.length > 0"
        :data="filterData"
        :columns="columns"
        :style="{ width: tableBodyWidth ? tableBodyWidth : '' }"></table-body>
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
// mixins
import fixedMixin from './fixedMixin';
import layoutMixin from './layoutMixin';
// components
import CoTableHeader from './table-header';
import TableBody from './table-body';

import { makeFlattenColumns } from './utils';

const prefixClass = 'co-table';

export default {
  name: 'co-table',
  mixins: [fixedMixin, layoutMixin],
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
    // 表格默认的排序
    defaultSort: {
      type: Object,
      validator(value) {
        return Object.prototype.toString.call(value) === '[object Object]' &&
          Object.keys(value).indexOf('prop') !== -1;
      },
    },
  },
  data() {
    return {
      tableId: `${prefixClass}`,
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
    tableBodyWidth() {
      const { bodyWidth, scrollY, scrollBarWidth } = this.layout;

      return bodyWidth ? `${bodyWidth - (scrollY ? scrollBarWidth : 0)}px` : '';
    },
  },
  watch: {
    // bug: 初始化的时候无法获取高度
    // 需要重新设计
    showHeader() {
      this.computedTableHeight();
    },
  },
  mounted() {
    this.doUpdateLayout();
    this.tableWidth = width(this.$refs.body);
    // 改变窗口大小重新计算表格布局
    this.resizeOff = listen(window, 'resize', throttle(() => {
      this.tableWidth = width(this.$refs.body);
    }, 17));
    this.computedTableHeight();
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

      // 判断是否有默认排序，设置默认排序列与列属性
      if (typeof this.defaultSort === 'object') {
        const { prop, order } = this.defaultSort;

        if (prop === instance.prop) {
          instance.order = order || instance.order;
          this.sortingColumn = instance;
          this.sortProp = prop;
        }
      }
    },
    computedTableHeight() {
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
      this.$emit('on-sort-change', {
        column,
        prop: column.prop,
        order: column.order,
      });
    },
    onNoSort() {
      this.sortingColumn = null;
      this.sortProp = '';
    },
    onBodyScroll(event) {
      const { header, body } = this.$refs;

      header.scrollLeft = body.scrollLeft;
    },
  },
  components: {
    CoTableHeader,
    TableBody,
  },
};
</script>
