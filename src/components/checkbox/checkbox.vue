<template>
  <label class="co-checkbox">
    <input
      type="checkbox"
      class="co-checkbox__input"
      v-model="model"
      :value="label">
    <span class="co-checkbox__indicator"></span>
    <span v-if="$slots.default || label" class="co-checkbox__description">
      <slot></slot>
      <template v-if="!$slots.default">{{ label }}</template>
    </span>
  </label>
</template>

<script>
export default {
  name: 'co-checkbox',
  props: {
    value: null,
    label: null,
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
  },
};
</script>
