<template>
  <header id="header">
    <co-row>
      <co-col :xs="24" :sm="24" :md="6" :lg="5" :xl="5" :xxl="4">
        <nuxt-link to="/" id="logo" exact>
          <img src="~/assets/vue.svg" alt="Vue logo" />
          <span>CoView</span>
        </nuxt-link>
      </co-col>
      <co-col :xs="0" :sm="0" :md="18" :lg="19" :xl="19" :xxl="20">
        <co-menu id="nav" mode="horizontal" @on-select="onSelect">
          <co-menu-item
            v-for="{ name, path } in links"
            :key="path"
            :name="name">
            <nuxt-link :to="path" exact>{{ name }}</nuxt-link>
          </co-menu-item>
        </co-menu>
      </co-col>
    </co-row>
  </header>
</template>

<script>
import cn from '~/locales/cn.json';

export default {
  name: 'TheHeader',
  data() {
    return {
      selectedNames: [this.$route.name],
      links: cn.header.navs,
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
@import "../../src/style/themes/default.less";

#header {
  position: relative;
  box-shadow: 0 2px 8px #f0f1f2;
  background-color: #fff;
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
