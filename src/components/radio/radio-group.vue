<template>
  <div class="co-radio-group">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'co-radio-group',
  props: {
    value: null,
  },
  watch: {
    value(newVal) {
      this.$emit('change', newVal);
    },
  },
};
</script>
