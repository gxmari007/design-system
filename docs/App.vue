<template>
  <div>coview docs {{ name }}</div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      name: process.VERSION,
    };
  },
};
</script>
