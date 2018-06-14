<template>
  <div class="app">
    <the-heading />
    <co-row class="app__main">
      <co-col class="app__sidebar" :xs="24" :sm="24" :md="24" :lg="6" :xl="5" :xxl="4">
        <the-sidebar />
      </co-col>
      <co-col class="app__content" :xs="0" :sm="0" :md="18" :lg="18" :xl="19" :xxl="20">
        <Content class="markdown" />
      </co-col>
    </co-row>
    <the-footer />
  </div>
</template>

<script>
import TheHeading from './components/TheHeading';
import TheSidebar from './components/TheSidebar';
import TheFooter from './components/TheFooter';

export default {
  name: 'App',
  components: {
    TheHeading,
    TheSidebar,
    TheFooter,
  },
};
</script>

<style src="prismjs/themes/prism-tomorrow.css"></style>
<style src="../../../src/style/index.less" lang="less"></style>
<style src="./styles/index.less" lang="less"></style>
<style lang="less">
.app {
  &__main {
    padding: 40px 0 0;
  }

  &__sidebar {
    z-index: 1;
  }

  &__content {
    min-height: 500px;
    overflow: hidden;
    border-left: 1px solid #ebedf0;
    padding: 0 170px 144px 64px;
    margin-left: -1px;
  }
}
</style>
