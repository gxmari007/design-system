<template>
  <div :class="classes" :style="styles">
    <slot />
  </div>
</template>

<script>
import { responsiveArray } from '../../utils/style';

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
    // < 576px 响应式栅格，可为栅格数或一个包含其他属性的对象
    xs: [Number, Object],
    // ≥ 576px 响应式栅格，可为栅格数或一个包含其他属性的对象
    sm: [Number, Object],
    // ≥768px 响应式栅格，可为栅格数或一个包含其他属性的对象
    md: [Number, Object],
    // ≥992px 响应式栅格，可为栅格数或一个包含其他属性的对象
    lg: [Number, Object],
    // ≥1200px 响应式栅格，可为栅格数或一个包含其他属性的对象
    xl: [Number, Object],
    // ≥1600px 响应式栅格，可为栅格数或一个包含其他属性的对象
    xxl: [Number, Object],
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

      const classes = {
        [`${prefixClass}-offset-${offset}`]: offset !== undefined,
        [`${prefixClass}-order-${order}`]: order !== undefined,
        [`${prefixClass}-pull-${pull}`]: pull !== undefined,
        [`${prefixClass}-push-${push}`]: push !== undefined,
        [`${prefixClass}-${span}`]: span !== undefined,
      };

      responsiveArray.forEach((size) => {
        const value = this[size];

        if (typeof value === 'number') {
          classes[`${prefixClass}-${size}-${value}`] = true;
        } else if (typeof value === 'object') {
          Object.keys(value).forEach((key) => {
            if (key === 'span') {
              classes[`${prefixClass}-${size}-${value[key]}`] = true;
            } else {
              classes[`${prefixClass}-${size}-${key}-${value[key]}`] = true;
            }
          });
        }
      });

      return classes;
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
      return this.inRow ? this.$parent.gutterValue : 0;
    },
  },
};
</script>
