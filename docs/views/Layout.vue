<template>
  <co-row class="row" type="flex" align="center" justify="middle" :gutter="20">
    <co-col span="6" order="3">
      <div class="item">1</div>
    </co-col>
    <co-col span="6" order="2">
      <div class="item">2</div>
    </co-col>
    <co-col span="6" order="1">
      <div class="item">3</div>
      <button @click="onStart">start</button>
      <button @click="onFinish">finish</button>
      <button @click="onError">error</button>
      <button @click="onRemove">remove</button>
    </co-col>
  </co-row>
</template>

<script>
export default {
  methods: {
    onStart() {
      this.$loading.start();
    },
    onFinish() {
      this.$loading.finish();
    },
    onError() {
      this.$loading.error();
    },
    onRemove() {
      this.$loading.destroy();
    },
  },
};
</script>

<style lang="less">
.row {
  height: 200px;
}
.item {
  height: 50px;
  background-color: #ddd;
}
</style>
