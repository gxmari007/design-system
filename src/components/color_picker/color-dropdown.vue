<template>
  <transition name="co-slide">
    <div class="co-color-picker__dropdown"></div>
  </transition>
</template>

<script>
export default {
  name: 'color-dropdown',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
