<template>
  <div class="co-checkbox-group">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'co-checkbox-group',
  props: {
    value: Array,
  },
  watch: {
    value(newVal) {
      this.$emit('change', newVal);
    },
  },
};
</script>
