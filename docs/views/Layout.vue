<template>
  <div>
    <co-pagination :total="1000" :max-pages="5" ellipsis></co-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: true,
    };
  },
};
</script>

<style>
body {
  padding: 50px;
}
.demo {
  color: #ff5500;
  padding: 0 5px;
}
</style>
