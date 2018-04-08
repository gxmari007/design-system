<template>
  <header id="header">
    <co-row>
      <co-col :xs="24" :sm="24" :md="6" :lg="5" :xl="5" :xxl="4">
        <router-link to="/" id="logo" exact>
          <img src="../../assets/vue.svg" alt="Vue logo" />
          <span>CoView</span>
        </router-link>
      </co-col>
      <co-col :xs="0" :sm="0" :md="18" :lg="19" :xl="19" :xxl="20">
        <co-menu id="nav" mode="horizontal" :selected-names="selectedNames" @on-select="onSelect">
          <co-menu-item
            v-for="item in links"
            :key="item.key"
            :name="item.key">
            <router-link :to="item.link" exact>{{ item.name }}</router-link>
          </co-menu-item>
        </co-menu>
      </co-col>
    </co-row>
  </header>
</template>

<script>
export default {
  name: 'TheHeader',
  data() {
    return {
      selectedNames: [this.$route.name],
      links: [
        { key: 'home', name: '首页', link: '/' },
        { key: 'components', name: '组件', link: '/components' },
      ],
    };
  },
  methods: {
    onSelect() {
      this.selectedNames = [this.$route.name];
    },
  },
};
</script>

<style lang="less">
@import "../../../src/style/themes/default.less";

#header {
  position: relative;
  box-shadow: 0 2px 8px #f0f1f2;
  z-index: 10;
}

#logo {
  float: left;
  height: 64px;
  line-height: 64px;
  padding-left: 40px;
  text-decoration: none;

  img, span {
    vertical-align: middle;
  }

  img {
    height: 32px;
    margin-right: 16px;
  }

  span {
    font-family: "Roboto", sans-serif;
    font-size: 16px;
    font-weight: 500;
    color: #0d1a26;
  }
}

#nav {
  float: right;
  border: 0;
  font-family: "Lato", @font-family;
  font-size: 14px;

  > .co-menu__item {
    min-width: 72px;
    height: 64px;
    line-height: 64px;
  }
}
</style>
