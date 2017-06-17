<template>
  <div>
    <co-switch v-model="value"></co-switch>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: true,
    };
  },
  methods: {
    // move(e) {
    //   const minLeft = 0;
    //   const maxLeft = parentWidth - this.$el.width;
    //   const minTop = 0;
    //   const maxTop = parentHeight - this.$el.height;
    // },
  },
};
</script>

<style>
body {
  padding: 50px;
}
.container {
  position: relative;
  width: 1000px;
  height: 1000px;
  background-color: #ddd;
}
.box {
  position: absolute;
  width: 200px;
  height: 200px;
  background-color: orange;
}
.right-handle {
  position: absolute;
  top: 50%;
  right: 0;
  width: 2px;
  height: 50%;
  transform: translateY(-50%);
  background-color: #555;
  cursor: ew-resize;
}
.bottom-handle {
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 50%;
  height: 2px;
  background-color: #555;
  transform: translateX(-50%);
  cursor: ns-resize;
}
</style>
