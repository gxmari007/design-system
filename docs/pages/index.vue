<template>
  <span>Home Page</span>
</template>

<script>
export default {
  name: 'Home',
  fetch({ redirect }) {
    redirect('/introduce');
  },
};
</script>
