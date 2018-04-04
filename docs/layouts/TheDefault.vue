<template>
  <div>
    <the-header />
    <div class="main-wrapper">
      <slot />
    </div>
  </div>
</template>

<script>
import TheHeader from '~/components/the_header';

export default {
  name: 'TheDefault',
  components: {
    TheHeader,
  },
};
</script>

<style lang="less">
.main-wrapper {
  padding: 40px 0 0;
}
</style>
