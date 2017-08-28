<template>
  <div :class="classes" :style="styles">
    <div class="co-table__hidden-columns">
      <slot></slot>
    </div>
    <div v-if="showHeader" ref="headerWrap" class="co-table__header-wrap" @mousewheel="onMousewheelProxy">
      <table-header
        ref="header"
        :style="headerStyles"
        :flatten-columns="flattenColumns"
        :origin-columns="originColumns"
        :sorting-column="sortingColumn"
        :scroll-y="layout.scrollY"
        :scroll-bar-width="layout.scrollBarWidth"
        :border="border"
        @sorting-column-change="onSortingColumnChange"
        @no-sort="onNoSort"
        @sort-change="onSortChange"></table-header>
    </div>
    <div ref="bodyWrap" class="co-table__body-wrap" :style="bodyWrapStyles" @scroll="onBodyScrollProxy">
      <div v-if="noData" class="co-table__empty-body">
        <span class="co-table__empty-text">
          <slot name="empty">{{ emptyText }}</slot>
        </span>
      </div>
      <table-body
        v-else
        ref="body"
        :style="bodyStyles"
        :columns="flattenColumns"
        :data="filterData"></table-body>
    </div>
    <div v-show="resizeProxyVisible" class="co-table__resize-proxy" ref="resizeProxy"></div>
  </div>
</template>

<script>
import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';
import { addResizeListener, removeResizeListener } from 'utils/resize';
import TableHeader from './table-header';
import TableBody from './table-body';
import layout from './layout';
import { getColumn, getFlattenColumns, orderBy } from './utils';

export default {
  name: 'co-table',
  mixins: [layout],
  props: {
    // 显示的数据
    data: {
      type: Array,
      default() { return []; },
    },
    // 表格高度（单位：px），如果表格实际高度大于此值，则会固定表头
    height: Number,
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
    hover: {
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
    // 表格是否自适应
    fit: {
      type: Boolean,
      default: true,
    },
    // 默认排序列的 prop 与 order
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
      originColumns: [],
      resizeHandler: null,
      sortingColumn: null,
      sortProp: '',
      resizeProxyVisible: false,
      tableId: 'co-table',
      onMousewheelProxy: throttle(this.onMousewheel, 17),
      onBodyScrollProxy: throttle(this.onBodyScroll, 17),
    };
  },
  computed: {
    noData() {
      return this.data.length === 0;
    },
    flattenColumns() {
      return getFlattenColumns(this.originColumns);
    },
    filterData() {
      const { sortingColumn, sortProp, data } = this;

      if (!sortingColumn ||
        !sortProp ||
        sortingColumn.sortable === 'custom') {
        return data;
      }

      return orderBy(data, sortProp, sortingColumn.order, sortingColumn.sortMethod);
    },
    classes() {
      const prefixClass = 'co-table';

      return [prefixClass, {
        [`${prefixClass}--border`]: this.border,
        [`${prefixClass}--stripe`]: this.stripe,
        [`${prefixClass}--hover`]: this.hover,
      }];
    },
    styles() {
      const styles = {};

      if (typeof this.height === 'number') {
        styles.height = `${this.height}px`;
      }

      return styles;
    },
    headerStyles() {
      const { width, scrollY, scrollBarWidth } = this.layout;

      return {
        width: `${width + (scrollY ? scrollBarWidth : 0)}px`,
      };
    },
    bodyWrapStyles() {
      const styles = {};

      if (typeof this.height === 'number') {
        styles.height = `${this.layout.height}px`;
      }

      return styles;
    },
    bodyStyles() {
      return { width: `${this.layout.width}px` };
    },
  },
  watch: {
    height() {
      this.$nextTick(this.updateHeight);
    },
    showHeader() {
      this.$nextTick(this.updateHeight);
    },
  },
  mounted() {
    this.bindEvent();
    this.doUpdateLayout();
  },
  beforeDestroy() {
    if (this.resizeHandler) {
      removeResizeListener(this.$el, this.resizeHandler);
    }
  },
  methods: {
    bindEvent() {
      if (this.fit) {
        this.resizeHandler = debounce(() => {
          this.doUpdateLayout();
        }, 150);
        addResizeListener(this.$el, this.resizeHandler);
      }
    },
    // 当 co-table-column 变动的时候调用更新 originColumns
    columnChange() {
      this.$nextTick(() => {
        this.originColumns = getColumn(this.$children);
        this.doUpdateLayout();
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
    onSortChange() {
      const { sortingColumn, sortProp } = this;

      this.$emit('on-sort-change', {
        column: sortingColumn,
        prop: sortProp,
        order: sortingColumn ? sortingColumn.order : '',
      });
    },
    onBodyScroll() {
      if (!this.showHeader || !this.layout.scrollX) return;

      const { headerWrap, bodyWrap } = this.$refs;

      headerWrap.scrollLeft = bodyWrap.scrollLeft;
    },
    onMousewheel(event) {
      const { deltaX, deltaY } = event;
      const { bodyWrap } = this.$refs;

      if (Math.abs(deltaX) < Math.abs(deltaY) || !this.layout.scrollX) return;

      if (deltaX > 0) {
        bodyWrap.scrollLeft += 10;
      } else if (deltaX < 0) {
        bodyWrap.scrollLeft -= 10;
      }
    },
  },
  components: {
    TableHeader,
    TableBody,
  },
};
</script>
