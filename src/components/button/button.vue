<template>
  <button
    :class="classes"
    :type="htmlType"
    :disabled="disabled"
    @click="onClick">
    <slot></slot>
  </button>
</template>

<script>
import { oneOf } from 'utils/help';

const prefixClass = 'co-button';

export default {
  name: 'co-button',
  props: {
    // 按钮的类型
    type: {
      type: String,
      default: 'default',
      validator(val) {
        return oneOf(val, ['default', 'primary', 'ghost', 'success', 'error', 'link']);
      },
    },
    // 按钮尺寸
    size: {
      type: String,
      validator(val) {
        return oneOf(val, ['small', 'large']);
      },
    },
    // 原生 type 属性
    htmlType: {
      type: String,
      default: 'button',
      validator(val) {
        return oneOf(val, ['button', 'submit', 'reset']);
      },
    },
    // 是否为块级按钮，宽度为 100%
    block: {
      type: Boolean,
      default: false,
    },
    // 是否禁用按钮
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      buttonGroup: null,
      buttonClick: false,
      timeoutID: null,
    };
  },
  computed: {
    classes() {
      return {
        [prefixClass]: true,
        [`${prefixClass}--${this.type}`]: true,
        [`${prefixClass}--block`]: this.block,
        [`${prefixClass}--${this.buttonSize}`]: this.buttonSize,
        [`${prefixClass}--clicked`]: this.buttonClick,
      };
    },
    isGroup() {
      let parent = this.$parent;

      while (parent) {
        if (parent.$options.name === 'co-button-group') {
          this.buttonGroup = parent;
          return true;
        } else {
          parent = parent.$parent;
        }
      }

      return false;
    },
    buttonSize() {
      return this.isGroup ? this.buttonGroup.size : this.size;
    },
  },
  beforeDestroy() {
    if (this.timeoutID) {
      clearTimeout(this.timeoutID);
    }
  },
  methods: {
    onClick() {
      // link 按钮没有点击动画
      if (this.type === 'link') return;

      if (this.timeoutID) {
        clearTimeout(this.timeoutID);
      }

      this.buttonClick = true;
      this.timeoutID = setTimeout(() => {
        this.buttonClick = false;
      }, 400);
    },
  },
};
</script>
