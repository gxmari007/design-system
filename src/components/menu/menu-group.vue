<template>
  <li class="co-menu__group">
    <div class="co-menu__group-title">{{ title }}</div>
    <ul class="co-menu__group-list">
      <slot></slot>
    </ul>
  </li>
</template>

<script>
export default {
  name: 'co-menu-group',
  props: {
    title: {
      type: String,
      default: '',
    },
  },
};
</script>
