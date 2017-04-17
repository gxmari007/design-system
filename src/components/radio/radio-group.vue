<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'co-radio-group',
  props: {
    // v-model
    value: null,
    // radio group 的类型
    type: {
      type: String,
      validator(val) {
        return val === 'button';
      },
    },
  },
  computed: {
    classes() {
      const prefixClass = 'co-radio-group';

      return {
        [prefixClass]: true,
        [`${prefixClass}--button`]: this.type === 'button',
      };
    },
  },
  watch: {
    value(newVal) {
      this.$emit('on-change', newVal);
    },
  },
};
</script>
