<template>
  <the-default>
    <co-menu mode="inline" style="width: 256px;" @on-click="onClick">
      <co-menu-item name="0">
        <co-icon type="mail" />
        Navigation One
      </co-menu-item>
      <co-menu-item name="1">
        <co-icon type="calendar" />
        Navigation Two
      </co-menu-item>
      <co-menu-item name="2">Navigation Three</co-menu-item>
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
  methods: {
    onClick(o) {
      console.log(o);
    },
  },
};
</script>
