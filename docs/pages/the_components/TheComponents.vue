<template>
  <the-default>
    <co-menu mode="horizontal">
      <co-menu-item name="0">menu item</co-menu-item>
      <co-menu-item name="1" disabled>
        <a href="">menu link</a>
      </co-menu-item>
      <co-menu-item name="2">menu item</co-menu-item>
    </co-menu>
  </the-default>
</template>

<script>
import TheDefault from '~/layouts/TheDefault';

export default {
  name: 'TheComponents',
  components: {
    TheDefault,
  },
};
</script>
