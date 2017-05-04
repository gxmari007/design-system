<template>
  <div class="co-affix">
    <div ref="affix" :class="classes" :style="styles">
      <slot></slot>
    </div>
    <div v-show="affix" :style="spanStyles"></div>
  </div>
</template>

<script>
// libs
import listen from 'dom-helpers/events/listen';
import offset from 'dom-helpers/query/offset';
import scrollTop from 'dom-helpers/query/scrollTop';
import throttle from 'lodash/throttle';

export default {
  name: 'co-affix',
  props: {
    // 定位在顶部
    offsetTop: {
      type: Number,
      default: 0,
    },
    // 定位在底部
    offsetBottom: Number,
  },
  data() {
    return {
      defaultTop: 0,
      affix: false,
      scrollEvent: null,
      resizeEvent: null,
      styles: null,
      spanStyles: null,
    };
  },
  computed: {
    classes() {
      const prefix = 'co-affix';

      return [`${prefix}__content`, {
        [`${prefix}__content--fixed`]: this.affix,
      }];
    },
    offsetType() {
      if (this.offsetBottom >= 0) {
        return 'bottom';
      }

      return 'top';
    },
  },
  watch: {
    affix(newVal) {
      if (newVal) {
        this.spanStyles = this.getElementSize(this.$refs.affix);
      }

      this.$emit('on-change', newVal);
    },
  },
  mounted() {
    this.$nextTick(() => {
      const scrollFunc = throttle(this.onScroll, 17);

      this.defaultTop = offset(this.$refs.affix).top;
      this.spanStyles = this.getElementSize(this.$refs.affix);
      this.scrollEvent = listen(window, 'scroll', scrollFunc);
      this.resizeEvent = listen(window, 'resize', scrollFunc);
    });
  },
  beforeDestroy() {
    const { scrollEvent, resizeEvent } = this;

    if (typeof scrollEvent === 'function') {
      scrollEvent();
    }

    if (typeof resizeEvent === 'function') {
      resizeEvent();
    }
  },
  methods: {
    onScroll() {
      const { affix, offsetTop, defaultTop, offsetBottom, offsetType } = this;
      const scroll = scrollTop(window);
      const { left, width, height } = offset(this.$refs.affix);
      const windowHeight = window.innerHeight;

      if (offsetType === 'top' && !affix && defaultTop - offsetTop < scroll) {
        this.styles = {
          top: `${offsetTop}px`,
          left: `${left}px`,
          width: `${width}px`,
        };
        this.affix = true;
        this.$emit('change', true);
      } else if (offsetType === 'top' && affix && defaultTop - offsetTop > scroll) {
        this.styles = null;
        this.affix = false;
        this.$emit('change', false);
      }

      if (offsetType === 'bottom' && !affix && scroll + windowHeight < defaultTop + height + offsetBottom) {
        this.styles = {
          bottom: `${offsetBottom}px`,
          left: `${left}px`,
          width: `${width}px`,
        };
        this.affix = true;
        this.$emit('change', true);
      } else if (offsetType === 'bottom' && affix && scroll + windowHeight > defaultTop + height + offsetBottom) {
        this.styles = null;
        this.affix = false;
        this.$emit('change', false);
      }
    },
    getElementSize(elm) {
      const { width, height } = offset(elm);

      return {
        width: `${width}px`,
        height: `${height}px`,
      };
    },
  },
};
</script>
