<template>
  <div>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'CoBreadcrumb',
  props: {
    // 自定义分隔符
    separator: {
      type: String,
      default: '/',
    },
  },
};
</script>
