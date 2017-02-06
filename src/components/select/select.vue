<template>
  <div :class="classes">
    <co-input
      ref="input"
      class="co-select__input"
      :placeholder="placeholder"
      icon="arrow_drop_down"
      :size="size"
      readonly
      @icon-click="focusInput"></co-input>
    <div class="co-select__menus">
      <slot></slot>
    </div>
  </div>
</template>

<script>
// components
import CoInput from 'components/input';
// utils
import { oneOf } from 'utils/help';

const prefixClass = 'co-select';

export default {
  name: 'co-select',
  componentName: 'co-select',
  props: {
    // 数据
    value: null,
    // 尺寸大小
    size: {
      type: String,
      validator(val) {
        return oneOf(val, ['small', 'large']);
      },
    },
    // 占位提示文本
    placeholder: {
      type: String,
      default: '请选择',
    },
  },
  computed: {
    classes() {
      return {
        [prefixClass]: true,
        [`${prefixClass}--${this.size}`]: this.size !== undefined,
      };
    },
  },
  methods: {
    // 点击图标的时候 input 也能获取到焦点
    focusInput() {
      this.$refs.input.$refs.input.focus();
    },
  },
  components: {
    CoInput,
  },
};
</script>
