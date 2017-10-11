<template>
  <section :class="classes">
    <slot></slot>
  </section>
</template>

<script>
export default {
  name: 'co-layout',
  computed: {
    classes() {
      const prefixClass = 'co-layout';

      return [prefixClass];
    },
  },
};
</script>
