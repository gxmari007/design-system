<template>
  <div class="picture">
    <div
      class="picture__item"
      v-for="img in imgs"
      :style="{ flexGrow: img.width * 100 / img.height, flexBasis: `${img.width * 240 / img.height}px` }">
      <i class="picture__item-hold" :style="{ paddingBottom: `${img.height / img.width * 100}%` }"></i>
      <img class="picture__img" :src="img.src">
    </div>
    <div class="picture__placeholder" v-for="n in 10"></div>
  </div>
</template>

<script>
export default {
  props: {
    // 格式为：
    // [
    //   { width: '100px', height: '200px', src: 'http://img1.png' },
    //   { width: '100px', height: '200px', src: 'http://img2.png' },
    // ]
    imgs: Array,
  },
};
</script>

<style lang="less">
.picture {
  display: flex;
  flex-wrap: wrap;
  margin: 2px;
}
.picture__item {
  margin: 2px;
  background-color: violet;
  position: relative;
}
.picture__item-hold {
  display: block;
  background-color: lightblue;
}
.picture__img {
  position: absolute;
  vertical-align: bottom;
  top: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.picture__placeholder {
  flex-grow: 100;
  flex-basis: 240px;
  height: 0;
  margin: 0;
}
</style>
