<template>
  <div :class="classes" :style="styles">
    <!-- 表头 -->
    <div class="co-table__hidden-columns">
      <slot></slot>
    </div>
    <div class="co-table__header" v-if="showHeader" ref="header">
      <co-table-header :columns="columns" :col-width="colWidth"></co-table-header>
    </div>
    <!-- 内容 -->
    <div class="co-table__body" ref="body" :style="bodyStyles">
      <co-table-body :data="data" :columns="columns" :col-width="colWidth"></co-table-body>
    </div>
  </div>
</template>

<script>
// libs
import width from 'dom-helpers/query/width';
import height from 'dom-helpers/query/height';
import listen from 'dom-helpers/events/listen';
import throttle from 'lodash/throttle';
// components
import CoTableHeader from './table-header';
import CoTableBody from './table-body';

const prefixClass = 'co-table';

export default {
  name: 'co-table',
  componentName: 'co-table',
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
    // 表格宽度
    width: [String, Number],
    // 表格高度，设置之后会固定表头
    height: [String, Number],
    // 是否显示表头
    showHeader: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      columns: [],
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
  },
  watch: {
    showHeader: {
      immediate: true,
      handler(newVal) {
        // 需要等到 dom 元素更新之后获取表头的 height 值
        this.$nextTick(() => {
          if (newVal) {
            this.headerHeight = height(this.$refs.header);
          } else {
            this.headerHeight = 0;
          }
        });
      },
    },
  },
  mounted() {
    this.tableWidth = width(this.$refs.body);
    // 改变窗口大小重新计算表格布局
    this.resizeOff = listen(window, 'resize', throttle(() => {
      this.tableWidth = width(this.$refs.body);
    }, 17));
  },
  beforeDestroy() {
    if (this.resizeOff) {
      this.resizeOff();
    }
  },
  methods: {
    // 从 co-table-column 添加列信息到 columns
    addColumn(instance) {
      this.columns.push(instance);
    },
  },
  components: {
    CoTableHeader,
    CoTableBody,
  },
};
</script>
