<template>
  <div :class="classes" :style="styles">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'CoCol',
  props: {
    // 栅格左侧的间隔格数，间隔内不可以有栅格
    offset: [Number, String],
    // 栅格顺序，flex 布局模式下有效
    order: [Number, String],
    // 栅格向左移动格数
    pull: [Number, String],
    // 栅格向右移动格数
    push: [Number, String],
    // 栅格占位格数
    span: [Number, String],
  },
  computed: {
    classes() {
      const {
        offset,
        order,
        pull,
        push,
        span,
      } = this;
      const prefixClass = 'co-col';

      return {
        [`${prefixClass}-offset-${offset}`]: offset !== undefined,
        [`${prefixClass}-order-${order}`]: order !== undefined,
        [`${prefixClass}-pull-${pull}`]: pull !== undefined,
        [`${prefixClass}-push-${push}`]: push !== undefined,
        [`${prefixClass}-${span}`]: span !== undefined,
      };
    },
    styles() {
      const { gutter } = this;
      const styles = {};

      if (gutter > 0) {
        styles.paddingRight = `${gutter / 2}px`;
        styles.paddingLeft = styles.paddingRight;
      }

      return styles;
    },
    // 判断是否是 CoRow 组件的子组件
    inRow() {
      return this.$parent && this.$parent.$options.name === 'CoRow';
    },
    gutter() {
      return this.inRow ? this.$parent.gutter : 0;
    },
  },
};
</script>
