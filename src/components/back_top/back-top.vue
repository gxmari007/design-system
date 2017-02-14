<template>
  <div v-show="show" class="co-back-top" :style="style" @click="onClick">
    <slot></slot>
  </div>
</template>

<script>
import listen from 'dom-helpers/events/listen';
import throttle from 'lodash/throttle';
import { scrollTo } from 'utils/help';

export default {
  name: 'co-back-top',
  props: {
    // 滚动条滚动指定像素显示 back-top 组件
    height: {
      type: Number,
      default: 300,
    },
    // 组件距离底部的位置
    bottom: {
      type: Number,
      default: 10,
    },
    // 组件距离右侧的位置
    right: {
      type: Number,
      default: 10,
    },
    // 动画持续时间
    duration: {
      type: Number,
      default: 1000,
    },
  },
  data() {
    return {
      show: false,
      scrollOff: null,
      resizeOff: null,
    };
  },
  computed: {
    style() {
      return {
        bottom: `${this.bottom}px`,
        right: `${this.bottom}px`,
      };
    },
  },
  created() {
    const callback = throttle(this.onScroll, 17);

    this.scrollOff = listen(window, 'scroll', callback);
    this.resizeOff = listen(window, 'resize', callback);
  },
  beforeDestroy() {
    if (this.scrollOff) {
      this.scrollOff();
    }

    if (this.resizeOff) {
      this.resizeOff();
    }
  },
  methods: {
    onScroll() {
      this.show = window.pageYOffset >= this.height;
    },
    onClick() {
      scrollTo(window, window.pageYOffset, 0, this.duration);
    },
  },
};
</script>
