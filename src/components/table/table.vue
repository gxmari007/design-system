<template>
  <div :class="classes" :style="styles">
    <!-- 表头 -->
    <div class="co-table__hidden-columns" ref="hiddenColumns">
      <slot></slot>
    </div>
    <div v-if="showHeader" class="co-table__header" ref="header">
      <co-table-header
        :style="{ width: layout.bodyWidth ? `${layout.bodyWidth}px` : '' }"
        :layout="layout"
        :columns="columns"
        :origin-columns="originColumns"
        :sorting-column="sortingColumn"
        :sort-prop="sortProp"
        :border="border"
        @sorting-column-change="onSortingColumnChange"
        @no-sort="onNoSort"
        @column-display="onColumnDisplay"></co-table-header>
    </div>
    <!-- 内容 -->
    <div class="co-table__body" :style="bodyStyles" ref="body" @scroll="onBodyScroll">
      <table-body
        v-if="data.length > 0"
        :data="filterData"
        :columns="columns"
        :style="{ width: tableBodyWidth ? tableBodyWidth : '' }"></table-body>
      <!-- 表格为空时的界面 -->
      <div v-else class="co-table__empty-body">
        <span class="co-table__empty-text">
          <slot v-if="$slots.empty" name="empty"></slot>
          <template v-else>{{ emptyText }}</template>
        </span>
      </div>
    </div>
    <div class="co-table__column-resize-proxy" ref="resizeProxy" v-show="resizeProxyVisible"></div>
    <table-display v-if="displayColumn" v-model="display" :column="displayColumn"></table-display>
  </div>
</template>

<script>
// libs
import orderBy from 'lodash/orderBy';
import throttle from 'lodash/throttle';
import { addResizeListener, removeResizeListener } from 'utils/resize';
// mixins
import fixedMixin from './fixedMixin';
import layoutMixin from './layoutMixin';
// components
import CoTableHeader from './table-header';
import TableBody from './table-body.vue';
import TableDisplay from './table-display';
// utils
import { makeFlattenColumns } from './utils';

const prefixClass = 'co-table';

export default {
  name: 'co-table',
  mixins: [fixedMixin, layoutMixin],
  props: {
    // 数据项
    data: Array,
    // 表格列是否自适应撑开
    fit: {
      type: Boolean,
      default: true,
    },
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
    // 表格高度，设置之后会固定表头
    height: Number,
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
    defaultDisplay: Object,
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
      display: false, // 列显示设置窗口开关
      displayColumn: null, // 当前显示设置的列
      resizeHandler: null,
      resizeProxyVisible: false, // 控制列边框代理的显示与隐藏
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
      const styles = {};
      let { height } = this;

      if (typeof height === 'string' && /^\d+$/.test(height)) {
        height = Number(height);
      }

      if (typeof height === 'number') {
        styles.height = `${this.height}px`;
      }

      if (typeof height === 'string') {
        styles.height = '';
      }

      return styles;
    },
    bodyStyles() {
      const styles = {};

      if (this.height) {
        styles.height = `${this.layout.bodyHeight}px`;
      }

      return styles;
    },
    // 原始列中没有 children 的列组成的数组
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
    showHeader() {
      this.updateHeight();
    },
    height() {
      this.updateHeight();
    },
  },
  mounted() {
    // 初始化
    this.bindEvent();
    this.doUpdateLayout();
    this.$on('column-display-change', this.onDisplayChange);
  },
  beforeDestroy() {
    if (typeof this.resizeHandler === 'function') {
      removeResizeListener(this.$el, this.resizeHandler);
    }
  },
  methods: {
    // 绑定事件
    bindEvent() {
      if (this.fit) {
        this.resizeHandler = throttle(() => {
          this.doUpdateLayout();
        }, 16);

        addResizeListener(this.$el, this.resizeHandler);
      }
    },
    // 从 co-table-column 添加列信息到 columns
    addColumn(instance, index, parent) {
      let array = this.originColumns;

      if (parent) {
        array = parent.children;

        if (!array) {
          array = [];
          parent.children = array;
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
    onBodyScroll() {
      if (!this.showHeader) return;

      const { header, body } = this.$refs;

      header.scrollLeft = body.scrollLeft;
    },
    onColumnDisplay(column) {
      this.displayColumn = column;
      this.$nextTick(() => {
        this.display = true;
      });
    },
    onDisplayChange(prop, display) {
      this.$emit('on-display-change', prop, display);
    },
  },
  components: {
    CoTableHeader,
    TableBody,
    TableDisplay,
  },
};
</script>
