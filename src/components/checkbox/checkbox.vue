<template>
  <label class="co-checkbox">
    <input type="checkbox" class="co-checkbox__input">
    <span class="co-checkbox__indicator"></span>
    <span class="co-checkbox__description">
      <slot></slot>
    </span>
  </label>
</template>

<script>
export default {
  name: 'co-checkbox',
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
