<template>
  <div class="co-carousel" @mouseenter="onMouseenter" @mouseleave="onMouseleave">
    <div class="co-carousel__list-wrap">
      <button class="co-carousel__prev" v-show="arrow !== 'none'" @click="play(-1)">
        <co-icon type="chevron-left"></co-icon>
      </button>
      <div class="co-carousel__list" :style="listStyles">
        <slot></slot>
      </div>
      <button class="co-carousel__next" v-show="arrow !== 'none'" @click="play(1)">
        <co-icon type="chevron-right"></co-icon>
      </button>
    </div>
    <ul :class="dotsClasses" v-show="dots !== 'none'">
      <li
        :class="['co-carousel__dot', { 'co-carousel__dot--active': currentIndex === index }]"
        v-for="(item, index) in items"
        :key="index"
        @click="onDotEvent('click', index)"
        @mouseover="onDotEvent('hover', index)">
        <button class="co-carousel__dot-btn"></button>
      </li>
    </ul>
  </div>
</template>

<script>
import debounce from 'lodash/debounce';
import CoIcon from 'components/icon';
import { oneOf } from 'utils/help';
import { addResizeListener, removeResizeListener } from 'utils/resize';

export default {
  name: 'co-carousel',
  props: {
    value: {
      type: Number,
      default: 0,
    },
    height: {
      type: [String, Number],
      default: 'auto',
      validator(value) {
        return value === 'auto' || typeof value === 'number';
      },
    },
    autoplay: {
      type: Boolean,
      default: false,
    },
    // 自动切换的时间间隔（ms）
    autoplaySpeed: {
      type: Number,
      default: 2000,
    },
    // 动画持续的时间（ms）
    duration: {
      type: Number,
      default: 500,
    },
    arrow: {
      type: String,
      default: 'hover',
      validator(value) {
        return oneOf(value, ['hover', 'always', 'none']);
      },
    },
    dots: {
      type: String,
      default: 'inside',
      validator(value) {
        return oneOf(value, ['inside', 'outside', 'none']);
      },
    },
    easing: {
      type: String,
      default: 'ease',
    },
    trigger: {
      type: String,
      default: 'click',
      validator(value) {
        return oneOf(value, ['click', 'hover']);
      },
    },
  },
  data() {
    return {
      currentIndex: this.value,
      wrapWidth: 0,
      listWidth: 0,
      listOffset: 0,
      timeoutID: null,
      items: [],
      resizeHandler: null,
    };
  },
  computed: {
    listStyles() {
      return {
        width: `${this.listWidth}px`,
        transform: `translate3d(-${this.listOffset}px, 0, 0)`,
        transition: `transform ${this.duration}ms ${this.easing}`,
      };
    },
    dotsClasses() {
      const prefixClass = 'co-carousel__dots';

      return [prefixClass, {
        [`co-carousel__dots--${this.dots}`]: this.dots !== 'none',
      }];
    },
  },
  watch: {
    value(newVal) {
      this.currentIndex = newVal;
    },
    currentIndex() {
      this.updateOffset();
    },
    autoplay() {
      this.setAutoplay();
    },
    autoplaySpeed() {
      this.setAutoplay();
    },
    height() {
      this.updateLayout();
    },
  },
  mounted() {
    this.updateItems();
    this.onResize();
    this.setAutoplay();
    this.resizeHandler = debounce(this.onResize, 150);

    addResizeListener(this.$el, this.resizeHandler);
  },
  beforeDestroy() {
    if (this.timeoutID) {
      clearInterval(this.timeoutID);
    }

    if (this.resizeHandler) {
      removeResizeListener(this.$el, this.resizeHandler);
    }
  },
  methods: {
    updateItems() {
      this.items = this.$children.filter(child => child.$options.name === 'co-carousel-item');
    },
    getChilds(cb) {
      function find(child) {
        if (child.$options.name === 'co-carousel-item') {
          cb(child);
        } else if (child.$children.length) {
          child.$children.forEach((innerChild) => {
            find(innerChild);
          });
        }
      }

      if (this.items.length) {
        this.items.forEach(find);
      } else {
        this.$children.forEach(find);
      }
    },
    updateLayout() {
      this.getChilds((child) => {
        child.width = this.wrapWidth;
        child.height = typeof this.height === 'number' ? `${this.height}px` : this.height;
      });

      this.listWidth = this.items.length * this.wrapWidth;
    },
    updateOffset() {
      this.listOffset = this.currentIndex * this.wrapWidth;
    },
    play(step) {
      let index = this.currentIndex;

      index += step;

      while (index < 0) {
        index += this.items.length;
      }

      index %= this.items.length;
      this.currentIndex = index;
      this.$emit('input', index);
    },
    setAutoplay() {
      if (this.timeoutID) {
        clearInterval(this.timeoutID);
      }

      if (this.autoplay) {
        this.timeoutID = setInterval(() => {
          this.play(1);
        }, this.autoplaySpeed);
      }
    },
    onMouseenter() {
      if (this.timeoutID) {
        clearInterval(this.timeoutID);
      }
    },
    onMouseleave() {
      this.setAutoplay();
    },
    onDotEvent(eventName, index) {
      if (eventName === this.trigger && this.currentIndex !== index) {
        this.currentIndex = index;
        this.$emit('input', index);
      }
    },
    onResize() {
      this.wrapWidth = this.$el.clientWidth;
      this.updateLayout();
      this.updateOffset();
    },
    slotChange() {
      this.$nextTick(() => {
        this.updateItems();
        this.updateLayout();
        this.updateOffset();
      });
    },
  },
  components: {
    CoIcon,
  },
};
</script>
