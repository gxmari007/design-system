<template>
  <div :class="classes">
    <transition name="co-fade">
      <div v-show="spinShow">
        <div class="co-spin__main">
          <div class="co-spin__wrapper">
            <div :class="spinningClasses">
              <div class="co-spin__one"></div>
              <div class="co-spin__two"></div>
              <div class="co-spin__three"></div>
            </div>
            <div v-if="tip" class="co-spin__text">{{ tip }}</div>
          </div>
        </div>
      </div>
    </transition>
    <div v-if="$slots.default" :class="containerClasses">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { SIZE, sizeMap } from 'utils/style';
import { oneOf } from 'utils/help';

export default {
  name: 'CoSpin',
  props: {
    // 组件尺寸大小，可选值为：small、default、large、sm、lg
    size: {
      type: String,
      default: 'default',
      validator(value) {
        return oneOf(value, SIZE);
      },
    },
    // 是否显示加载动画
    spinShow: {
      type: Boolean,
      default: true,
    },
    // 自定义的描述文本
    tip: String,
  },
  computed: {
    classes() {
      const prefixClass = 'co-spin';

      return [prefixClass, {
        [`${prefixClass}--${sizeMap[this.size]}`]: this.size !== 'default',
        [`${prefixClass}--container`]: !!this.$slots.default,
      }];
    },
    spinningClasses() {
      const prefixClass = 'co-spin__spinning';

      return [prefixClass, {
        [`${prefixClass}--text`]: !!this.tip,
      }];
    },
    containerClasses() {
      const prefixClass = 'co-spin__container';

      return [prefixClass, {
        [`${prefixClass}--blur`]: this.spinShow,
      }];
    },
  },
};
</script>
