<template>
  <div>
    <the-header />
    <div class="main">
      <co-row>
        <co-col class="main__menu" :xs="24" :sm="24" :md="6" :lg="5" :xl="5" :xxl="4">
          <the-sidebar />
        </co-col>
        <co-col class="main__container" :xs="24" :sm="24" :md="24" :lg="18" :xl="19" :xxl="20">
          <nuxt />
        </co-col>
      </co-row>
    </div>
  </div>
</template>

<script>
import TheHeader from '~/components/TheHeader';
import TheSidebar from '~/components/TheSidebar';

export default {
  components: {
    TheHeader,
    TheSidebar,
  },
};
</script>

<style lang="less">
.main {
  padding: 40px 0 0;
  background-color: #fff;

  &__menu {
    z-index: 1;
  }

  &__container {
    min-height: 500px;
    padding: 0 170px 144px 64px;
    border-left: 1px solid #e8e8e8;
    margin-left: -1px;
    overflow: hidden;
  }
}
</style>
