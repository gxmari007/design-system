<template>
  <div :class="classes" :style="styles">
    <slot></slot>
  </div>
</template>

<script>
const prefixClass = 'co-col';

export default {
  name: 'co-col',
  props: {
    // 栅格布局占位格数 0 ~ 24
    span: [Number, String],
    // flex 布局下栅格的顺序
    order: [Number, String],
    // 栅格相对左侧偏移格数
    offset: [Number, String],
    // 栅格向右移动格数
    push: [Number, String],
    // 栅格向左移动格数
    pull: [Number, String],
    // 响应式布局参数
    // < 768px
    xs: [Number, Object],
    // >= 768px
    sm: [Number, Object],
    // >= 992px
    md: [Number, Object],
    // >= 1200px
    lg: [Number, Object],
  },
  data() {
    return {
      isInRow: this.$parent && this.$parent.$options.name === 'co-row',
    };
  },
  computed: {
    classes() {
      const { span, order, offset, push, pull } = this;
      const classList = {
        [`${prefixClass}-${span}`]: span !== undefined,
        [`${prefixClass}-order-${order}`]: order !== undefined,
        [`${prefixClass}-offset-${offset}`]: offset !== undefined,
        [`${prefixClass}-push-${push}`]: push !== undefined,
        [`${prefixClass}-pull-${pull}`]: pull !== undefined,
      };

      ['xs', 'sm', 'md', 'lg'].forEach((size) => {
        const layout = this[size];

        if (typeof layout === 'number') {
          classList[`${prefixClass}-${size}-${layout}`] = true;
        } else if (typeof layout === 'object') {
          Object.keys(layout).forEach((key) => {
            if (key === 'span') {
              classList[`${prefixClass}-${size}-${layout[key]}`] = true;
            } else {
              classList[`${prefixClass}-${size}-${key}-${layout[key]}`] = true;
            }
          });
        }
      });

      return classList;
    },
    styles() {
      const { gutter } = this;
      const style = {};

      if (gutter !== 0) {
        style.paddingRight = `${gutter / 2}px`;
        style.paddingLeft = style.paddingRight;
      }

      return style;
    },
    // 获取父级组件的 gutter 属性，如果没有则为 0
    gutter() {
      return this.isInRow ? this.$parent.gutter : 0;
    },
  },
};
</script>
