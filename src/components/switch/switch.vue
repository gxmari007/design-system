<template>
  <label :class="classes">
    <input
      class="co-switch__input"
      v-model="model"
      type="checkbox"
      :disabled="disabled">
    <span class="co-switch__content">
      <template v-if="$slots.on && model">
        <slot name="on"></slot>
      </template>
      <template v-if="$slots.off && !model">
        <slot name="off">否</slot>
      </template>
    </span>
  </label>
</template>

<script>
// mixins
import emitter from 'mixins/emitter';
// utils
import { oneOf } from 'utils/help';

export default {
  name: 'co-switch',
  mixins: [emitter],
  props: {
    // v-model
    value: Boolean,
    // 尺寸
    size: {
      type: String,
      validator(val) {
        return oneOf(val, ['small']);
      },
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false,
    },
    // 是否触发表单验证事件
    validate: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    model: {
      get() {
        return this.value;
      },
      set(val) {
        this.dispatch('co-form-item', 'form-item-change', val);
        this.$emit('on-change', val);
        this.$emit('input', val);
      },
    },
    classes() {
      const prefixClass = 'co-switch';

      return {
        [prefixClass]: true,
        [`${prefixClass}--checked`]: this.model,
        [`${prefixClass}--${this.size}`]: typeof this.size !== 'undefined',
        [`${prefixClass}--disabled`]: this.disabled,
      };
    },
  },
};
</script>
