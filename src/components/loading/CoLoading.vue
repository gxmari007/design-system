<template>
  <transition name="co-loading__fade">
    <div :class="outClasses" :style="outStyles" v-show="show">
      <div :class="innerClasses" :style="innerStyles"></div>
    </div>
  </transition>
</template>

<script>
import { oneOf } from '../../utils/help';

const prefixClass = 'co-loading';

export default {
  name: 'CoLoading',
  props: {
    // 显示或隐藏
    show: {
      type: Boolean,
      default: false,
    },
    // 加载条进度
    percent: {
      type: Number,
      default: 0,
    },
    // 加载条颜色
    color: {
      type: String,
      default: 'primary',
    },
    // 加载条失败颜色
    failedColor: {
      type: String,
      default: 'error',
    },
    // 加载条高度
    height: {
      type: Number,
      default: 2,
    },
    // 加载条状态
    status: {
      type: String,
      validator(value) {
        return oneOf(value, ['success', 'error']);
      },
      default: 'success',
    },
  },
  computed: {
    outClasses() {
      return prefixClass;
    },
    innerClasses() {
      const { color, failedColor, status } = this;

      return {
        [`${prefixClass}__progress`]: true,
        [`${prefixClass}__progress--primary`]: color === 'primary' && status === 'success',
        [`${prefixClass}__progress--error`]: failedColor === 'error' && status === 'error',
      };
    },
    outStyles() {
      return {
        height: `${this.height}px`,
      };
    },
    innerStyles() {
      const { percent, height, color, failedColor, status } = this;
      const styles = {
        width: `${percent}%`,
        height: `${height}px`,
      };

      if (color !== 'primary' && status === 'success') {
        styles.backgroundColor = color;
      }

      if (failedColor !== 'error' && status === 'error') {
        styles.backgroundColor = failedColor;
      }

      return styles;
    },
  },
};
</script>
