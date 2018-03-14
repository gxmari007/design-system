<template>
  <the-default>
    <co-menu mode="inline" style="width: 256px;">
      <co-menu-item>menu item</co-menu-item>
      <co-menu-item>
        <a href="">menu link</a>
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
