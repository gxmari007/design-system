<template>
  <div>
    <co-carousel style="width: 500px;" autoplay trigger="click" dots="outside">
      <co-carousel-item>
        <div class="carousel-demo">1</div>
      </co-carousel-item>
      <co-carousel-item>
        <div class="carousel-demo">2</div>
      </co-carousel-item>
      <co-carousel-item>
        <div class="carousel-demo">3</div>
      </co-carousel-item>
      <co-carousel-item>
        <div class="carousel-demo">4</div>
      </co-carousel-item>
    </co-carousel>
    <co-carousel trigger="hover">
      <co-carousel-item>
        <div class="carousel-demo">1</div>
      </co-carousel-item>
      <co-carousel-item>
        <div class="carousel-demo">2</div>
      </co-carousel-item>
      <co-carousel-item>
        <div class="carousel-demo">3</div>
      </co-carousel-item>
      <co-carousel-item>
        <div class="carousel-demo">4</div>
      </co-carousel-item>
    </co-carousel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 100,
      visible: false,
    };
  },
  methods: {
    onClick() {
      this.count = this.count === 100 ? 0 : 100;
    },
  },
};
</script>

<style>
body {
  padding: 50px;
}
.carousel-demo {
  height: 220px;
  line-height: 220px;
  text-align: center;
  font-size: 18px;
  color: #fff;
  background-color: #364d79;
}
</style>
