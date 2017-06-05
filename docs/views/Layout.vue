<template>
  <div>
    <co-dropdown placement="bottom-start">
      <co-button>下拉菜单</co-button>
      <co-dropdown-menu slot="menu">
        <co-dropdown-item>测试 item</co-dropdown-item>
        <co-dropdown-item>测试 item</co-dropdown-item>
        <co-dropdown-item>测试 item</co-dropdown-item>
        <co-dropdown-item>测试 item</co-dropdown-item>
        <co-dropdown-item>测试 item</co-dropdown-item>
        <co-dropdown-item>测试 item</co-dropdown-item>
        <co-dropdown-item divided>测试 item</co-dropdown-item>
        <co-dropdown-item>测试 item</co-dropdown-item>
        <co-dropdown placement="right-start">
          <co-dropdown-item>子目录 <co-icon type="ios-arrow-right"></co-icon></co-dropdown-item>
          <co-dropdown-menu slot="menu">
            <co-dropdown-item>item 1</co-dropdown-item>
            <co-dropdown-item>item 2</co-dropdown-item>
          </co-dropdown-menu>
        </co-dropdown>
      </co-dropdown-menu>
    </co-dropdown>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 100,
      visible: false,
    };
  },
  methods: {
    onClick() {
      this.count = this.count === 100 ? 0 : 100;
    },
  },
};
</script>

<style>
body {
  padding: 50px;
}
</style>
