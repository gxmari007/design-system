<template>
  <div>
    <the-header />
    <div class="main-wrapper">
      <co-row>
        <co-col :xs="24" :sm="24" :md="6" :lg="5" :xl="5" :xxl="4">
          <the-sidebar />
        </co-col>
        <co-col >
          <slot />
        </co-col>
      </co-row>
    </div>
  </div>
</template>

<script>
import TheHeader from '~/components/the_header';
import TheSidebar from '~/components/the_sidebar';

export default {
  name: 'TheDefault',
  components: {
    TheHeader,
    TheSidebar,
  },
};
</script>

<style lang="less">
.main-wrapper {
  padding: 40px 0 0;
}
</style>
