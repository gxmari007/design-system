<template>
  <li class="co-menu__item-group">
    <div v-if="$slots.title" class="co-menu__item-group-title">
      <slot name="title" />
    </div>
    <ul v-if="$slots.default" class="co-menu__item-group-list">
      <slot />
    </ul>
  </li>
</template>

<script>
export default {
  name: 'CoItemGroup',
};
</script>
