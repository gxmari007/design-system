<template>
  <label :class="classes">
    <span class="co-radio__wrapper">
      <input
        type="radio"
        class="co-radio__input"
        v-model="model"
        :value="label"
        :disabled="disabled">
      <span class="co-radio__indicator"></span>
    </span><span class="co-radio__description"><slot>{{ label }}</slot></span>
  </label>
</template>

<script>
import emitter from 'mixins/emitter';

const prefixClass = 'co-radio';

export default {
  name: 'co-radio',
  mixins: [emitter],
  props: {
    value: null,
    label: {
      type: null,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      selfModel: null,
      radioGroup: null,
    };
  },
  computed: {
    model: {
      get() {
        return this.isGroup ?
          this.radioGroup.value : this.value !== undefined ?
          this.value : this.selfModel;
      },
      set(val) {
        if (this.isGroup) {
          this.dispatch('co-radio-group', 'input', val);
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
        if (parent.$options.name !== 'co-radio-group') {
          parent = parent.$parent;
        } else {
          this.radioGroup = parent;
          return true;
        }
      }

      return false;
    },
    classes() {
      return {
        [prefixClass]: true,
        [`${prefixClass}--checked`]: this.model === this.label,
        [`${prefixClass}--disabled`]: this.disabled,
      };
    },
  },
};
</script>
