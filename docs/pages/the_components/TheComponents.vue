<template>
  <the-default>
    <co-menu mode="inline" style="width: 256px;" :open-names="[]" :default-selected-names="['0']">
      <co-menu-item name="0">
        <a href="/"><co-icon type="mail" /> Navigation One</a>
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
        <co-item-group>
          <template slot="title">Item 1</template>
          <co-menu-item name="7">Menu Item</co-menu-item>
          <co-menu-item name="8">Menu Item</co-menu-item>
        </co-item-group>
        <co-item-group>
          <template slot="title">Item 2</template>
          <co-menu-item name="2">Menu Item</co-menu-item>
          <co-menu-item name="3">Menu Item</co-menu-item>
        </co-item-group>
        <co-sub-menu name="sub1">
          <template slot="title">
            <!-- <co-icon type="search" /> -->
            Submenu
          </template>
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
