<template>
  <the-default>
    <co-menu mode="vertical" style="width: 256px;" :open-names="['sub0']">
      <co-menu-item name="0">
        <co-icon type="mail" />
        Navigation One
      </co-menu-item>
      <co-menu-item name="1">
        <co-icon type="calendar" />
        Navigation Two
      </co-menu-item>
      <co-sub-menu name="sub0">
        <template slot="title">
          <co-icon type="appstore" />
          Navigation Three
        </template>
        <co-menu-item name="2">Menu Item</co-menu-item>
        <co-menu-item name="3">Menu Item</co-menu-item>
        <co-sub-menu name="sub1">
          <template slot="title">Navigation Three</template>
          <co-menu-item name="4">Menu Item</co-menu-item>
          <co-menu-item name="5">Menu Item</co-menu-item>
        </co-sub-menu>
      </co-sub-menu>
      <co-menu-item name="6">
        <co-icon type="calendar" />
        Navigation Four
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
