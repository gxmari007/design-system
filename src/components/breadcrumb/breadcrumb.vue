<template>
  <div class="co-breadcrumb">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'co-breadcrumb',
  componentName: 'co-breadcrumb',
  props: {
    separator: {
      type: String,
      default: '/',
    },
  },
};
</script>
