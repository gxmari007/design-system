<template>
  <div :class="classes" :style="styles">
    <!-- 表头 -->
    <div class="co-table__hidden-columns">
      <slot></slot>
    </div>
    <div class="co-table__header" v-if="showHeader" ref="header">
      <co-table-header :columns="columns"></co-table-header>
    </div>
    <!-- 内容 -->
    <div class="co-table__body" :style="bodyStyles">
      <table>
        <tbody>
          <tr v-for="item in data">
            <td v-for="column in columns">
              <div class="co-table__cell">{{ item[column.prop] }}</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
// libs
import height from 'dom-helpers/query/height';
// components
import CoTableHeader from './table-header';

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
      headerHeight: 0,
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
  methods: {
    // 从 co-table-column 添加列信息到 columns
    addColumn(instance) {
      this.columns.push(instance);
    },
  },
  components: {
    CoTableHeader,
  },
};
</script>
