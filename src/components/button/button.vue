<template>
  <button
    :class="classes"
    :type="nativeType"
    :disabled="disabled"
    @click="onClick">
    <transition name="co-fade">
      <co-icon v-if="loading" class="co-button__loading" type="load-c"></co-icon>
    </transition>
    <co-icon v-if="showIcon" :type="icon"></co-icon>
    <slot></slot>
  </button>
</template>

<script>
import CoIcon from 'components/icon';
import { oneOf } from 'utils/help';
import { sizeMap, SIZE } from 'utils/style';

export default {
  name: 'co-button',
  props: {
    // 按钮的类型
    type: {
      type: String,
      default: 'default',
      validator(value) {
        return oneOf(value, ['default', 'primary', 'ghost', 'success', 'error', 'link']);
      },
    },
    // 按钮尺寸
    size: {
      type: String,
      validator(value) {
        return oneOf(value, SIZE);
      },
    },
    // 原生 type 属性
    nativeType: {
      type: String,
      default: 'button',
      validator(value) {
        return oneOf(value, ['button', 'submit', 'reset']);
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
    // 开启按钮载入状态
    loading: {
      type: Boolean,
      default: false,
    },
    // 设置按钮的图标
    icon: String,
  },
  data() {
    return {
      buttonGroup: null,
      clicked: false,
      timeoutID: null,
    };
  },
  computed: {
    classes() {
      const prefixClass = 'co-button';

      return [prefixClass, {
        [`${prefixClass}--${this.type}`]: true,
        [`${prefixClass}--block`]: this.block,
        [`${prefixClass}--${sizeMap[this.buttonSize]}`]: !!this.buttonSize,
        [`${prefixClass}--loading`]: this.loading,
        [`${prefixClass}--clicked`]: this.clicked,
      }];
    },
    isGroup() {
      let parent = this.$parent;

      while (parent) {
        if (parent.$options.name === 'co-button-group') {
          this.buttonGroup = parent;
          return true;
        }

        parent = parent.$parent;
      }

      return false;
    },
    buttonSize() {
      return this.isGroup ? this.buttonGroup.size : this.size;
    },
    showIcon() {
      if (this.icon && !this.loading) return true;
      return false;
    },
  },
  beforeDestroy() {
    if (this.timeoutID) {
      clearTimeout(this.timeoutID);
    }
  },
  methods: {
    onClick() {
      if (this.type === 'link') return;

      this.clicked = true;

      if (this.timeoutID) {
        clearTimeout(this.timeoutID);
      }

      this.timeoutID = setTimeout(() => {
        this.clicked = false;
      }, 400);
    },
  },
  components: {
    CoIcon,
  },
};
</script>
