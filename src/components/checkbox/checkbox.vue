<template>
  <label :class="classes">
    <input
      v-if="trueLabel || falseLabel"
      type="checkbox"
      class="co-checkbox__input"
      v-model="model"
      :true-value="trueLabel"
      :false-value="falseLabel"
      :disabled="disabled">
    <input
      v-else
      type="checkbox"
      class="co-checkbox__input"
      v-model="model"
      :value="label"
      :disabled="disabled">
    <span class="co-checkbox__indicator"></span>
    <span v-if="$slots.default || label" class="co-checkbox__description">
      <slot></slot>
      <template v-if="!$slots.default">{{ label }}</template>
    </span>
  </label>
</template>

<script>
import emitter from 'mixins/emitter';

const prefixClass = 'co-checkbox';

export default {
  name: 'co-checkbox',
  mixins: [emitter],
  props: {
    value: null,
    label: null,
    trueLabel: null,
    falseLabel: null,
    checked: {
      type: Boolean,
      default: false,
    },
    indeterminate: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      selfModel: false,
      checkboxGroup: null,
    };
  },
  computed: {
    model: {
      get() {
        return this.isGroup ?
          this.checkboxGroup.value : this.value !== undefined ?
          this.value : this.selfModel;
      },
      set(val) {
        if (this.isGroup) {
          this.dispatch('co-checkbox-group', 'input', val);
        } else if (this.value !== undefined) {
          this.$emit('input', val);
        } else {
          this.selfModel = val;
        }
      },
    },
    isGroup() {
      let parent = this.$parent;

      while (parent) {
        if (parent.$options.componentName !== 'co-checkbox-group') {
          parent = parent.$parent;
        } else {
          this.checkboxGroup = parent;
          return true;
        }
      }

      return false;
    },
    isChecked() {
      const { model } = this;

      if (typeof model === 'boolean') {
        return model;
      } else if (Array.isArray(model)) {
        return model.indexOf(this.label) > -1;
      } else if (model !== null && model !== undefined) {
        return model === this.trueLabel;
      }

      return false;
    },
    classes() {
      return {
        [prefixClass]: true,
        [`${prefixClass}--checked`]: this.isChecked,
        [`${prefixClass}--indeterminate`]: this.indeterminate,
        [`${prefixClass}--disabled`]: this.disabled,
      };
    },
  },
  created() {
    if (this.checked) {
      this.setModel();
    }
  },
  methods: {
    setModel() {
      if (Array.isArray(this.model) && this.model.indexOf(this.label) === -1) {
        this.model.push(this.label);
      } else {
        this.model = this.trueLabel || true;
      }
    },
  },
};
</script>
