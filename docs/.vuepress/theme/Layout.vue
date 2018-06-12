<template>
  <div class="app">
    <the-heading />
    <co-row class="app__main">
      <co-col :xs="24" :sm="24" :md="24" :lg="6" :xl="5" :xxl="4">
        <the-sidebar />
      </co-col>
      <co-col class="app__content" :xs="0" :sm="0" :md="18" :lg="18" :xl="19" :xxl="20">
        <Content />
      </co-col>
    </co-row>
  </div>
</template>

<script>
import TheHeading from './components/TheHeading';
import TheSidebar from './components/TheSidebar';

export default {
  name: 'App',
  components: {
    TheHeading,
    TheSidebar,
  },
};
</script>

<style lang="less">
@import "../../../src/style/index.less";

.app {
  &__main {
    padding: 40px 0 0;
  }

  &__content {
    min-height: 500px;
    overflow: hidden;
    border-left: 1px solid #ebedf0;
    padding: 0 170px 0 64px;
    margin-left: -1px;
  }
}
</style>
