<template>
  <button :class="classes">
    <slot></slot>
  </button>
</template>

<script>
const prefixClass = 'co-button';

export default {
  name: 'co-button',
  computed: {
    classes() {
      return {
        [prefixClass]: true,
      };
    },
  },
};
</script>
