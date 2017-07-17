<template>
  <div>
    <!-- <co-menu mode="vertical" theme="light">
      <co-menu-group title="管理">
        <co-menu-item name="1">内容管理</co-menu-item>
        <co-menu-item name="2">文章管理</co-menu-item>
        <co-menu-item name="3">用户管理</co-menu-item>
      </co-menu-group>
      <co-menu-group title="管理系列">
        <co-menu-item name="4">内容管理</co-menu-item>
        <co-menu-item name="5">文章管理</co-menu-item>
        <co-menu-item name="6">用户管理</co-menu-item>
      </co-menu-group>
    </co-menu> -->
    <co-menu theme="light">
      <co-menu-item name="7">内容管理</co-menu-item>
      <co-menu-item name="8">文章管理</co-menu-item>
      <co-submenu name="0" title="子管理">
        <co-menu-group title="管理">
          <co-menu-item name="1">内容管理</co-menu-item>
          <co-menu-item name="2">文章管理</co-menu-item>
          <co-menu-item name="3">用户管理</co-menu-item>
        </co-menu-group>
        <co-menu-group title="管理系列">
          <co-menu-item name="4">内容管理</co-menu-item>
          <co-menu-item name="5">文章管理</co-menu-item>
          <co-menu-item name="6">用户管理</co-menu-item>
        </co-menu-group>
      </co-submenu>
    </co-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgs: [
        { width: 300, height: 300, src: '../static/img/1.jpg' },
        { width: 169, height: 300, src: '../static/img/2.jpg' },
        { width: 300, height: 300, src: '../static/img/3.jpg' },
        { width: 452, height: 300, src: '../static/img/4.jpg' },
        { width: 533, height: 300, src: '../static/img/5.jpg' },
        { width: 480, height: 300, src: '../static/img/6.jpg' },
      ],
    };
  },
};
</script>

<style lang="less">
.container {
  display: flex;
  flex-wrap: wrap;

  &::after {
    content: "";
    flex-grow: 999;
  }
}
.img-item {
  position: relative;
}
.item-blank {
  display: block;
}
.image {
  position: absolute;
  top: 0;
  width: 100%;
}
</style>
