<template>
  <transition name="co-back-top">
    <div v-show="show" class="co-back-top" :style="styles" @click="onClick">
      <slot>
        <co-icon class="co-back-top__default" type="chevron-up" size="20" color="#fff"></co-icon>
      </slot>
    </div>
  </transition>
</template>

<script>
// libs
import throttle from 'lodash/throttle';
import debounce from 'lodash/debounce';
// utils
import { scrollTo } from 'utils/help';
// components
import CoIcon from 'components/icon';

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
      default: 30,
    },
    // 组件距离右侧的位置
    right: {
      type: Number,
      default: 30,
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
      scrollHandler: throttle(this.onScroll, 17),
      resizeHandler: debounce(this.onScroll, 150),
    };
  },
  computed: {
    styles() {
      return {
        bottom: `${this.bottom}px`,
        right: `${this.bottom}px`,
      };
    },
  },
  mounted() {
    window.addEventListener('scroll', this.scrollHandler);
    window.addEventListener('resize', this.resizeHandler);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.scrollHandler);
    window.removeEventListener('resize', this.resizeHandler);
  },
  methods: {
    onScroll() {
      this.show = window.pageYOffset >= this.height;
    },
    onClick() {
      scrollTo(window, window.pageYOffset, 0, this.duration);
    },
  },
  components: {
    CoIcon,
  },
};
</script>
