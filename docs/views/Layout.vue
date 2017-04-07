<template>
  <div class="test">
    <co-tooltip placement="top-start" trigger="focus" :delay="{ show: 1000, hide: 1000 }" content="test text">
      <co-button>button</co-button>
    </co-tooltip>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: true,
    };
  },
};
</script>

<style>
.test {
  padding: 80px;
  height: 2000px;
}
</style>
