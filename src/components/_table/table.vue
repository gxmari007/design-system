<template>
  <div :class="classes" :style="styles">
    <div class="co-table__hidden-columns">
      <slot></slot>
    </div>
    <!-- table header -->
    <div v-if="showHeader" ref="headerWrap" class="co-table__header-wrap" @mousewheel="onMousewheelProxy">
      <table-header
        ref="header"
        :style="headerStyles"
        :flatten-columns="flattenColumns"
        :origin-columns="originColumns"
        :left-fixed-columns="leftFixedColumns"
        :right-fixed-columns="rightFixedColumns"
        :sorting-column="sortingColumn"
        :scroll-y="layout.scrollY"
        :scroll-bar-width="layout.scrollBarWidth"
        :border="border"
        @sorting-column-change="onSortingColumnChange"
        @no-sort="onNoSort"
        @sort-change="onSortChange"></table-header>
    </div>
    <!-- table body -->
    <div ref="bodyWrap" class="co-table__body-wrap" :style="bodyWrapStyles" @scroll="onBodyScrollProxy">
      <div v-if="noData" class="co-table__empty-body" :style="bodyStyles">
        <span class="co-table__empty-text">
          <slot name="empty">{{ emptyText }}</slot>
        </span>
      </div>
      <table-body
        v-else
        ref="body"
        :style="bodyStyles"
        :flatten-columns="flattenColumns"
        :left-fixed-columns="leftFixedColumns"
        :right-fixed-columns="rightFixedColumns"
        :hover="hover"
        :hover-index="hoverIndex"
        :data="filterData"
        @hover-in="onHoverIn"
        @hover-out="onHoverOut"></table-body>
    </div>
    <!-- left fixed -->
    <div v-if="leftFixedColumns.length > 0" class="co-table__left-fixed" :style="fixedStyles('left')">
      <div class="co-table__fixed-header-wrap">
        <table-header
          :style="{ width: `${this.layout.leftFixedWidth}px` }"
          fixed="left"
          :flatten-columns="flattenColumns"
          :origin-columns="originColumns"
          :left-fixed-columns="leftFixedColumns"
          :right-fixed-columns="rightFixedColumns"
          :sorting-column="sortingColumn"
          :scroll-y="layout.scrollY"
          :scroll-bar-width="layout.scrollBarWidth"
          :border="border"
          @sorting-column-change="onSortingColumnChange"
          @no-sort="onNoSort"
          @sort-change="onSortChange"></table-header>
      </div>
      <div
        class="co-table__fixed-body-wrap"
        ref="leftFixedBodyWrap"
        :style="{ height: `${this.layout.fixedBodyHeight}px`, top: `${this.layout.headerHeight}px` }">
        <table-body
          :style="{ width: `${this.layout.leftFixedWidth}px` }"
          fixed="left"
          :flatten-columns="flattenColumns"
          :left-fixed-columns="leftFixedColumns"
          :right-fixed-columns="rightFixedColumns"
          :hover="hover"
          :hover-index="hoverIndex"
          :data="filterData"
          @hover-in="onHoverIn"
          @hover-out="onHoverOut"></table-body>
      </div>
    </div>
    <!-- right fixed -->
    <div v-if="rightFixedColumns.length > 0" class="co-table__right-fixed" :style="fixedStyles('right')">
      <div class="co-table__fixed-header-wrap">
        <table-header
          :style="{ width: `${this.layout.rightFixedWidth}px` }"
          fixed="right"
          :flatten-columns="flattenColumns"
          :origin-columns="originColumns"
          :left-fixed-columns="leftFixedColumns"
          :right-fixed-columns="rightFixedColumns"
          :sorting-column="sortingColumn"
          :scroll-y="layout.scrollY"
          :scroll-bar-width="layout.scrollBarWidth"
          :border="border"
          @sorting-column-change="onSortingColumnChange"
          @no-sort="onNoSort"
          @sort-change="onSortChange"></table-header>
      </div>
      <div
        class="co-table__fixed-body-wrap"
        ref="rightFixedBodyWrap"
        :style="{ height: `${this.layout.fixedBodyHeight}px`, top: `${this.layout.headerHeight}px` }">
        <table-body
          :style="{ width: `${this.layout.rightFixedWidth}px` }"
          fixed="right"
          :flatten-columns="flattenColumns"
          :left-fixed-columns="leftFixedColumns"
          :right-fixed-columns="rightFixedColumns"
          :hover="hover"
          :hover-index="hoverIndex"
          :data="filterData"
          @hover-in="onHoverIn"
          @hover-out="onHoverOut"></table-body>
      </div>
    </div>
    <div v-if="showFixedPlaceholder" class="co-table__fixed-placeholder"></div>
    <div v-show="resizeProxyVisible" class="co-table__resize-proxy" ref="resizeProxy"></div>
  </div>
</template>

<script>
import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';
import { addResizeListener, removeResizeListener } from '../../utils/resize';
import TableHeader from './table-header';
import TableBody from './table-body';
import layout from './layout';
import { getColumns, getFlattenColumns, orderBy } from './utils';

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
          Object.keys(value).indexOf('prop') > -1;
      },
    },
    // 表格子列的属性名
    childrenColumnName: {
      type: String,
      default: 'children',
    },
    // 行数据的 key，优化表格渲染，用于树形表格与带展开功能的表格
    // String 类型则返回 row[rowKey] 作为 key
    // Function 类型则是 rowKey(row) 的返回值作为 key
    rowKey: {
      type: [String, Function],
      default: 'key',
    },
    // 设置表格展开行，需要设置 rowKey 属性才有效，其值为展开行的 keys 数组
    expandRowKeys: Array,
    // 是否默认展开所有表格行，只在具有展开行功能的表格中有效
    defaultExpandAll: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      tableId: 'co-table',
      columns: [],
      resizeHandler: null,
      sortingColumn: null,
      sortProp: '',
      resizeProxyVisible: false,
      hoverIndex: null,
      onMousewheelProxy: throttle(this.onMousewheel, 17),
      onBodyScrollProxy: throttle(this.onBodyScroll, 17),
    };
  },
  computed: {
    noData() {
      return this.data.length === 0;
    },
    originColumns() {
      return [
        ...this.leftFixedColumns,
        ...this.columns.filter(column => !column.fixed),
        ...this.rightFixedColumns,
      ];
    },
    flattenColumns() {
      return getFlattenColumns(this.originColumns);
    },
    leftFixedColumns() {
      return this.columns.filter(column => column.fixed === 'left');
    },
    rightFixedColumns() {
      return this.columns.filter(column => column.fixed === 'right');
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
    showFixedPlaceholder() {
      const {
        rightFixedColumns,
        layout: { scrollY, scrollBarWidth },
      } = this;

      return rightFixedColumns.length > 0 && scrollY && scrollBarWidth > 0;
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
    // 当增加或删除 co-table-column 的时候调用更新 originColumns
    columnChange() {
      this.$nextTick(() => {
        this.columns = getColumns(this.$children);
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
      const { headerWrap, bodyWrap, leftFixedBodyWrap, rightFixedBodyWrap } = this.$refs;

      if (headerWrap) headerWrap.scrollLeft = bodyWrap.scrollLeft;
      if (leftFixedBodyWrap) leftFixedBodyWrap.scrollTop = bodyWrap.scrollTop;
      if (rightFixedBodyWrap) rightFixedBodyWrap.scrollTop = bodyWrap.scrollTop;
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
    onHoverIn(index) {
      this.hoverIndex = index;
    },
    onHoverOut(index) {
      this.hoverIndex = index;
    },
    fixedStyles(type) {
      const { scrollY, scrollBarWidth } = this.layout;
      const style = {
        width: `${type === 'left' ? this.layout.leftFixedWidth : this.layout.rightFixedWidth}px`,
        height: `${this.layout.fixedHeight}px`,
      };

      if (type === 'right') {
        style.right = `${scrollY && scrollBarWidth > 0 ? scrollBarWidth : 0}px`;
      }

      return style;
    },
  },
  components: {
    TableHeader,
    TableBody,
  },
};
</script>
