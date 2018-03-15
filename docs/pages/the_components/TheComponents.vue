<template>
  <the-default>
    <co-menu mode="inline" style="width: 256px;">
      <co-menu-item name="0">menu item</co-menu-item>
      <co-menu-item name="1">
        <a>menu link</a>
      </co-menu-item>
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
