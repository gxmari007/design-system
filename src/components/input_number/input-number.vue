<template>
  <div :class="classes">
    <div class="co-input-number__btn-group">
      <co-icon
        :class="increaseClasses"
        type="keyboard_arrow_up"
        @click.native="onIncrease"></co-icon>
      <co-icon
        :class="decreaseClasses"
        type="keyboard_arrow_down"
        @click.native="onDecrease"></co-icon>
    </div>
    <input
      type="text"
      class="co-input-number__input"
      :value="model"
      autocomplete="off"
      :disabled="disabled"
      :placeholder="placeholder"
      @focus="onFocus"
      @blur="onBlur"
      @input="onInput">
  </div>
</template>

<script>
// components
import CoIcon from 'components/icon';
// utils
import { oneOf } from 'utils/help';

const prefixClass = 'co-input-number';

export default {
  name: 'co-input-number',
  props: {
    // v-model
    value: {
      type: Number,
      default: 0,
    },
    // 输入框尺寸
    size: {
      type: String,
      validate(val) {
        return oneOf(val, ['small', 'large']);
      },
    },
    // 是否禁用输入框
    disabled: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: '请输入',
    },
    // 最小值
    min: {
      type: Number,
      default: -Infinity,
    },
    // 最大值
    max: {
      type: Number,
      default: Infinity,
    },
    // 数字递增的间隔数
    step: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      model: 0,
      focus: false,
    };
  },
  computed: {
    classes() {
      return {
        [prefixClass]: true,
        [`${prefixClass}--small`]: this.size === 'small',
        [`${prefixClass}--large`]: this.size === 'large',
        [`${prefixClass}--focus`]: this.focus,
        [`${prefixClass}--disabled`]: this.disabled,
      };
    },
    increaseClasses() {
      const className = `${prefixClass}__btn`;

      return {
        [className]: true,
        [`${className}--disabled`]: this.increase(this.value, this.step) > this.max,
      };
    },
    decreaseClasses() {
      const className = `${prefixClass}__btn`;

      return {
        [className]: true,
        [`${className}--disabled`]: this.decrease(this.value, this.step) < this.min,
      };
    },
    precision() {
      const { value, step, getPrecision } = this;

      return Math.max(getPrecision(value), getPrecision(step));
    },
  },
  watch: {
    value: {
      immediate: true,
      handler(newVal) {
        let val = Number(newVal);

        if (isNaN(val)) return;

        if (val <= this.min) {
          val = this.min;
        }

        if (val >= this.max) {
          val = this.max;
        }

        this.model = val;
        this.$emit('input', val);
      },
    },
  },
  methods: {
    setValue(val) {
      let value = val;
      let oldValue = this.model;

      if (value <= this.min) {
        value = this.min;
      }

      if (value >= this.max) {
        value = this.max;
      }

      if (value === oldValue) return;

      this.$emit('input', value);
      // 这里暴露组件 on-change 事件
      this.$emit('on-change', value, oldValue);
    },
    // 获取数字的小数位数
    getPrecision(number) {
      const str = number.toString();
      const dotIndex = str.indexOf('.');
      let precision = 0;

      if (dotIndex !== -1) {
        precision = str.length - dotIndex - 1;
      }

      return precision;
    },
    // 根据获得的小数精度格式化数字
    formatPrecision(number) {
      return parseFloat(Number(number).toFixed(this.precision));
    },
    // 加法运算方法
    increase(number, step) {
      const precisionFactor = Math.pow(10, this.precision);

      return this.formatPrecision((number * precisionFactor + step * precisionFactor) / precisionFactor);
    },
    // 减法运算方法
    decrease(number, step) {
      const precisionFactor = Math.pow(10, this.precision);

      return this.formatPrecision((number * precisionFactor - step * precisionFactor) / precisionFactor);
    },
    onFocus() {
      this.focus = true;
    },
    onBlur() {
      const { model } = this;
      const val = Number(model);

      if (model === '' || isNaN(val) || val <= this.min || val >= this.max) {
        this.model = this.value;
      } else {
        this.$emit('input', val);
      }

      this.focus = false;
    },
    onInput(e) {
      const value = e.target.value;
      let val = Number(value);

      if (value !== '' && !isNaN(val)) {
        this.setValue(val);
      }

      this.model = value;
    },
    // 加法事件
    onIncrease() {
      const value = Number(this.value);
      const result = this.increase(value, this.step);

      if (result > this.max) return;
      this.setValue(result);
    },
    // 减法事件
    onDecrease() {
      const value = Number(this.value);
      const result = this.decrease(value, this.step);

      if (result < this.min) return;
      this.setValue(result);
    },
  },
  components: {
    CoIcon,
  },
};
</script>
