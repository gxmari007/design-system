<template>
  <div :class="classes">
    <textarea
      v-if="type === 'textarea'"
      class="co-input__textarea"
      :placeholder="placeholder"
      :readonly="readonly"
      :disabled="disabled"
      :rows="rows"
      :autofocus="autofocus"
      @blur="onBlur"
      @change="onChange"></textarea>
    <template v-else>
      <co-icon
        v-if="icon"
        class="co-input__icon"
        :type="icon"
        @click.native="onIconClick"></co-icon>
      <input
        ref="input"
        class="co-input__input"
        :value="model"
        :type="type"
        :placeholder="placeholder"
        :readonly="readonly"
        :disabled="disabled"
        :autocomplete="autocomplete"
        :autofocus="autofocus"
        @input="onInput"
        @blur="onBlur"
        @change="onChange">
    </template>
  </div>
</template>

<script>
// components
import CoIcon from 'components/icon';
// mixins
import emitter from 'mixins/emitter';
// utils
import { oneOf } from 'utils/help';

const prefixClass = 'co-input';

export default {
  name: 'co-input',
  mixins: [emitter],
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
    // 是否触发表单项的验证事件
    validate: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      model: this.value,
    };
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
  watch: {
    value(newVal) {
      this.setModel(newVal);
    },
  },
  methods: {
    onIconClick() {
      this.$refs.input.focus();
      this.$emit('on-icon-click');
    },
    onInput(event) {
      const value = event.target.value;

      this.$emit('input', value);
      this.$emit('on-change', event);
    },
    onBlur(event) {
      this.$emit('on-blur', event);

      if (this.validate) {
        this.dispatch('co-form-item', 'form-item-blur', this.model);
      }
    },
    onChange(event) {
      this.$emit('on-input-change', event);
    },
    setModel(value) {
      if (value === this.model) return;

      this.model = value;

      if (this.validate) {
        this.dispatch('co-form-item', 'form-item-change', this.model);
      }
    },
  },
  components: {
    CoIcon,
  },
};
</script>
