<template>
  <div class="app">
    <TheHeading />
    <Content />
  </div>
</template>

<script>
import TheHeading from './components/TheHeading';

export default {
  name: 'App',
  components: {
    TheHeading,
  },
};
</script>
