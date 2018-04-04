<template>
  <header id="header">
    <co-row>
      <co-col :xs="24" :sm="24" :md="6" :lg="5" :xl="5" :xxl="4">
        <router-link to="/" id="logo" exact>
          <img src="../../assets/vue.svg" alt="Vue logo" />
          <span>CoView</span>
        </router-link>
      </co-col>
    </co-row>
  </header>
</template>

<script>
export default {
  name: 'TheHeader',
};
</script>

<style lang="less">
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

  img {
    height: 32px;
    margin-right: 16px;
  }

  span {
    font-size: 16px;
  }
}
</style>
