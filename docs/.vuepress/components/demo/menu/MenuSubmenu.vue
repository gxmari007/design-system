<template>
  <code-box :code="code">
    <template slot="demo">
      <co-menu mode="inline" style="width: 256px;">
        <co-menu-item name="mail">
          <co-icon type="mail" />Navigation One
        </co-menu-item>
        <co-menu-item name="app" disabled>
          <co-icon type="appstore" />Navigation Two
        </co-menu-item>
        <co-sub-menu name="sub">
          <template slot="title">
            <co-icon type="setting" />
            <span>Navigation Three</span>
          </template>
          <co-item-group>
            <template slot="title">Item 1</template>
            <co-menu-item name="setting:1">Option 1</co-menu-item>
            <co-menu-item name="setting:2">Option 2</co-menu-item>
          </co-item-group>
          <co-item-group>
            <template slot="title">Item 2</template>
            <co-menu-item name="setting:3">Option 3</co-menu-item>
            <co-menu-item name="setting:4">Option 4</co-menu-item>
          </co-item-group>
        </co-sub-menu>
      </co-menu>
    </template>
    <template slot="title">内嵌菜单</template>
    <template slot="desc">垂直菜单，子菜单内嵌在菜单区域。</template>
  </code-box>
</template>

<script>
import { horizontal } from './code';

export default {
  name: 'MenuSubmenu',
  data() {
    return {
      code: horizontal,
    };
  },
};
</script>
