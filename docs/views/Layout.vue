<template>
  <div class="test">
    <co-select style="width: 220px;" placeholder="选择状态" size="large"></co-select>
    <co-select style="width: 220px;" placeholder="选择状态"></co-select>
    <co-select style="width: 220px;" placeholder="选择状态" size="small"></co-select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: [],
    };
  },
};
</script>

<style>
.test {
  height: 2000px;
  padding: 100px;
}
</style>
