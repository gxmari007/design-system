<template>
  <div class="co-checkbox-group">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'co-checkbox-group',
  componentName: 'co-checkbox-group',
  props: {
    value: Array,
  },
};
</script>
