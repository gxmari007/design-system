<template>
  <the-default>
    <co-menu mode="inline" :default-selected-keys="['0', '1']" style="width: 256px;">
      <co-menu-item name="0">Navigation One</co-menu-item>
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
