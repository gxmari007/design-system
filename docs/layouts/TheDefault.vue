<template>
  <div>
    <the-header />
    <slot />
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
