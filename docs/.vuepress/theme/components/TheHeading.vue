<template>
  <CoRow class="the-heading">
    <CoCol :xs="24" :sm="24" :md="6" :lg="5" :xl="5" :xxl="4">
      <router-link to="/" class="the-heading__logo">
        <img src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" alt="logo" />
        <span>CoView</span>
      </router-link>
    </CoCol>
    <CoCol :xs="0" :sm="0" :md="18" :lg="19" :xl="19" :xxl="20">
    </CoCol>
  </CoRow>
</template>

<script>
export default {
  name: 'TheHeading',
};
</script>

<style lang="less">
.the-heading {
  position: relative;
  z-index: 10;
  background-color: #fff;
  box-shadow: 0 2px 8px #f0f1f2;

  &__logo {
    display: flex;
    align-items: center;
    float: left;
    height: 64px;
    padding-left: 40px;

    img {
      height: 32px;
      margin-right: 16px;
      vertical-align: middle;
    }

    span {
      font-family: 'Titillium Web', sans-serif;
      font-size: 18px;
      font-weight: 500;
      color: #0d1a26;
    }
  }
}
</style>
