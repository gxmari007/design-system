<template>
  <div>
    <TheHeader />
    <nuxt />
  </div>
</template>

<script>
import TheHeader from '~/components/TheHeader';

export default {
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
