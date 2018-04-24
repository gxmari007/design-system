<template>
  <div :class="classes" :style="styles">
    <slot />
  </div>
</template>

<script>
import Vue from 'vue';
import { oneOf } from '../../utils/help';
import { responsiveArray } from '../../utils/style';

let enquire;
const responsiveMap = {
  xs: '(max-width: 575px)',
  sm: '(min-width: 576px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 992px)',
  xl: '(min-width: 1200px)',
  xxl: '(min-width: 1600px)',
};

// matchMedia polyfill
if (!Vue.prototype.$isServer) {
  const matchMediaPolyfill = mediaQuery => ({
    media: mediaQuery,
    matches: false,
    addListener() {},
    removeListener() {},
  });

  window.matchMedia = window.matchMedia || matchMediaPolyfill;
  /* eslint-disable global-require */
  enquire = require('enquire.js');
}

export default {
  name: 'CoRow',
  props: {
    // flex 布局下的垂直对齐方式
    align: {
      type: String,
      validator(value) {
        return oneOf(value, ['top', 'middle', 'bottom']);
      },
    },
    // 栅格间隔
    gutter: {
      type: [Number, Object],
      default: 0,
    },
    // flex 布局下的水平排列方式
    justify: {
      type: String,
      validator(value) {
        return oneOf(value, ['start', 'end', 'center', 'space-round', 'space-between']);
      },
    },
    // 布局模式，可选值只有 flex
    type: {
      type: String,
      validator(value) {
        return oneOf(value, ['flex']);
      },
    },
  },
  data() {
    return {
      screens: {
        xs: false,
        sm: false,
        md: false,
        lg: false,
        xl: false,
        xxl: false,
      },
    };
  },
  computed: {
    classes() {
      const { type, align, justify } = this;
      const isFlex = type === 'flex';
      const prefixClass = isFlex ? 'co-row-flex' : 'co-row';

      return [prefixClass, {
        [`${prefixClass}--${align}`]: isFlex && align !== undefined,
        [`${prefixClass}--${justify}`]: isFlex && justify !== undefined,
      }];
    },
    gutterValue() {
      const { gutter, screens } = this;

      if (typeof gutter === 'object') {
        for (let i = 0, len = responsiveArray.length; i < len; i += 1) {
          const breakpoint = responsiveArray[i];

          if (screens[breakpoint] && gutter[breakpoint] !== undefined) {
            return gutter[breakpoint];
          }
        }
      }

      return gutter;
    },
    styles() {
      const { gutterValue } = this;
      const styles = {};

      if (gutterValue > 0) {
        styles.marginRight = `${gutterValue / -2}px`;
        styles.marginLeft = styles.marginRight;
      }

      return styles;
    },
  },
  mounted() {
    // 此步绑定浏览器响应事件，故而放在 mounted 中绑定
    Object.keys(responsiveMap).forEach((screen) => {
      enquire.register(responsiveMap[screen], {
        match: () => {
          if (typeof this.gutter !== 'object') return;
          this.screens[screen] = true;
        },
        unmatch: () => {
          if (typeof this.gutter !== 'object') return;
          this.screens[screen] = false;
        },
        destroy() {},
      });
    });
  },
  beforeDestroy() {
    Object.keys(responsiveMap).forEach((screen) => {
      enquire.unregister(responsiveMap[screen]);
    });
  },
};
</script>
