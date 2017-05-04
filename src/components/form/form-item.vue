<template>
  <div :class="classes">
    <label class="co-form__label" :style="labelStyles" v-if="hasLabel">
      <slot name="label">{{ label }}</slot>
    </label>
    <div class="co-form__control" :style="controlStyles">
      <slot></slot>
      <transition name="co-fade">
        <span class="co-form__message" v-if="isShowMessage">{{ validateMessage }}</span>
      </transition>
    </div>
  </div>
</template>

<script>
// libs
import AsyncValidator from 'async-validator';
// mixins
import emitter from 'mixins/emitter';
// utils
import { getValueByPath } from './utils';

export default {
  name: 'co-form-item',
  mixins: [emitter],
  props: {
    // 对应 form 组件中 model 的属性字段
    prop: String,
    // 表单项标签文本
    label: String,
    // 表单项标签的宽度
    labelWidth: Number,
    // 表单项验证规则
    rules: [Object, Array],
    // 添加必填标识，如果不设置则根据规则中是否含有 required 属性添加
    required: {
      type: Boolean,
      default: false,
    },
    // 是否显示错误信息
    showMessage: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      initialValue: '',
      isRequired: false,
      validateState: '',
      validateMessage: '',
      validateDisable: false,
    };
  },
  computed: {
    classes() {
      const prefix = 'co-form__item';

      return {
        [prefix]: true,
        [`${prefix}--required`]: this.required || this.isRequired,
      };
    },
    labelStyles() {
      const styles = {};
      const labelWidth = this.labelWidth || this.form.labelWidth;

      if (labelWidth) {
        styles.width = `${labelWidth}px`;
      }

      return styles;
    },
    controlStyles() {
      const styles = {};
      const labelWidth = this.labelWidth || this.form.labelWidth;

      if (labelWidth) {
        styles.marginLeft = `${labelWidth}px`;
      }

      return styles;
    },
    form() {
      let parent = this.$parent;

      while (parent && parent.$options.name !== 'co-form') {
        parent = parent.$parent;
      }

      return parent;
    },
    fieldValue() {
      const model = this.form.model;

      if (!model || !this.prop) return null;

      return getValueByPath(model, this.prop).v;
    },
    fieldRules() {
      const formRules = this.form.rules;
      const selfRules = this.rules;
      const fromParentRules = formRules ? formRules[this.prop] : [];

      return [...(selfRules || fromParentRules || [])];
    },
    isShowMessage() {
      return this.form.showMessage && this.showMessage && this.validateState === 'error';
    },
    hasLabel() {
      return this.label || this.$slots.label;
    },
  },
  methods: {
    // 这里把规则集中没有 trigger 或者含有 trigger 的规则筛选出来
    filterRules(trigger) {
      return this.fieldRules.filter(rule => !rule.trigger || rule.trigger.indexOf(trigger) !== -1);
    },
    validate(trigger, cb = () => {}) {
      const specificRules = this.filterRules(trigger);

      if (specificRules.length === 0) {
        cb();
        return;
      }

      this.validateState = 'validating';

      const descriptor = {
        [this.prop]: specificRules,
      };

      const validator = new AsyncValidator(descriptor);
      const model = {
        [this.prop]: this.fieldValue,
      };

      validator.validate(model, { firstFields: true }, (errors) => {
        this.validateState = errors ? 'error' : 'success';
        this.validateMessage = errors ? errors[0].message : '';

        cb(this.validateMessage);
      });
    },
    // 重置字段
    resetField() {
      const model = this.form.model;
      const path = this.prop;
      const value = this.fieldValue;

      if (!model || !path) return;

      const obj = getValueByPath(model, path);

      this.validateState = '';
      this.validateMessage = '';

      if (Array.isArray(value) && value.length > 0) {
        this.validateDisable = true;
        obj.o[obj.k] = [];
      } else if (value !== this.initialValue) {
        this.validateDisable = true;
        obj.o[obj.k] = this.initialValue;
      }
    },
    // 当表单项失去焦点的触发验证事件函数
    onFieldBlur() {
      this.validate('blur');
    },
    // 当表单项输入值发生变化的时候触发验证
    onFieldChange() {
      if (this.validateDisable) {
        this.validateDisable = false;
        return;
      }

      this.validate('change');
    },
  },
  mounted() {
    if (this.prop) {
      this.dispatch('co-form', 'add-form-item', this);

      this.initialValue = this.fieldValue;

      if (this.fieldRules.length > 0) {
        this.fieldRules.some((rule) => {
          if (rule.required) {
            this.isRequired = true;
            return true;
          }

          return false;
        });

        this.$on('form-item-blur', this.onFieldBlur);
        this.$on('form-item-change', this.onFieldChange);
      }
    }
  },
  beforeDestroy() {
    this.dispatch('co-form', 'remove-form-item', this);
  },
};
</script>
