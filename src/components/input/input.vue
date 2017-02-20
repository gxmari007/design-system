<template>
  <div :class="classes">
    <textarea
      v-if="type === 'textarea'"
      class="co-input__textarea"
      :placeholder="placeholder"
      :readonly="readonly"
      :disabled="disabled"
      :rows="rows"
      :autofocus="autofocus"></textarea>
    <template v-else>
      <co-icon
        v-if="icon"
        class="co-input__icon"
        :type="icon"
        @click.native="onIconClick"></co-icon>
      <input
        ref="input"
        class="co-input__input"
        :value="value"
        :type="type"
        :placeholder="placeholder"
        :readonly="readonly"
        :disabled="disabled"
        :autocomplete="autocomplete"
        :autofocus="autofocus"
        @input="onInput">
    </template>
  </div>
</template>

<script>
// components
import CoIcon from '../icon';
// utils
import { oneOf } from 'utils/help';

const prefixClass = 'co-input';

export default {
  name: 'co-input',
  props: {
    value: [String, Number],
    type: {
      type: String,
      default: 'text',
    },
    placeholder: {
      type: String,
      default: '请输入',
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    icon: String,
    rows: {
      type: Number,
      default: 2,
    },
    autocomplete: {
      type: String,
      default: 'off',
    },
    autofocus: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      validator(value) {
        return oneOf(value, ['small', 'large']);
      },
    },
  },
  computed: {
    classes() {
      const { size } = this;

      return {
        [prefixClass]: true,
        [`${prefixClass}--${size}`]: !!size,
      };
    },
  },
  methods: {
    onIconClick() {
      this.$emit('icon-click');
    },
    onInput(e) {
      this.$emit('input', e.target.value);
    },
  },
  components: {
    CoIcon,
  },
};
</script>
