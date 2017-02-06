<template>
  <div class="co-select__option">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'co-option',
  props: {
    value: null,
    label: String,
    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
