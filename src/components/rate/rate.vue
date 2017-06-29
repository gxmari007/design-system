<template>
  <div :class="classes" @mouseleave="onMouseleave">
    <div class="co-rate__item" v-for="(item, index) in max" :key="index">
      <co-icon
        :style="iconStyles(index)"
        :type="iconType(index)"
        @mouseenter.native="onMouseenter(index)"
        @click.native="onClick(index)"></co-icon>
      <co-icon
        class="co-rate__icon-half"
        :style="iconStyles(index, true)"
        :type="iconType(index)"
        @mouseenter.native="onMouseenter(index, true)"
        @click.native="onClick(index, true)"></co-icon>
    </div>
  </div>
</template>

<script>
import CoIcon from 'components/icon';

export default {
  name: 'co-rate',
  props: {
    value: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 5,
    },
    voidColor: {
      type: String,
      default: '#e9e9e9',
    },
    colors: {
      type: Array,
      default() {
        return ['#f7ba2a', '#f7ba2a', '#f7ba2a'];
      },
      validator(value) {
        return value.length === 3;
      },
    },
    lowThreshold: {
      type: Number,
      default: 2,
    },
    highThreshold: {
      type: Number,
      default: 4,
    },
    allowHalf: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    icons: {
      type: Array,
      default() {
        return ['star', 'star', 'star'];
      },
      validator(value) {
        return value.length === 3;
      },
    },
    voidIcon: {
      type: String,
      default: 'star',
    },
  },
  data() {
    const { value } = this;

    return {
      currentValue: value,
      hoverCount: value,
    };
  },
  watch: {
    value(newVal) {
      if (newVal !== this.currentValue) {
        this.currentValue = newVal;
      }
    },
  },
  computed: {
    classes() {
      const prefixClass = 'co-rate';

      return [prefixClass, {
        [`${prefixClass}--disabled`]: this.disabled,
      }];
    },
  },
  methods: {
    iconStyles(count, half = false) {
      const styles = {};
      const { hoverCount, lowThreshold, highThreshold, colors, voidColor } = this;
      const n = half ? count + 0.5 : count + 1;

      if (n <= hoverCount) {
        if (hoverCount <= lowThreshold) {
          styles.color = colors[0];
        } else if (hoverCount > lowThreshold && hoverCount < highThreshold) {
          styles.color = colors[1];
        } else {
          styles.color = colors[2];
        }
      } else {
        styles.color = voidColor;
      }

      return styles;
    },
    iconType(index) {
      const { hoverCount, lowThreshold, highThreshold, icons } = this;
      const count = index + 1;

      if (count <= hoverCount) {
        if (hoverCount <= lowThreshold) {
          return icons[0];
        } else if (count > lowThreshold && count < highThreshold) {
          return icons[1];
        }

        return icons[2];
      }

      return this.voidIcon;
    },
    onMouseenter(count, half = false) {
      if (this.disabled) return;

      if (this.allowHalf && half) {
        this.hoverCount = count + 0.5;
      } else {
        this.hoverCount = count + 1;
      }
    },
    onMouseleave() {
      if (this.disabled) return;

      this.hoverCount = this.currentValue;
    },
    onClick(count, half = false) {
      if (this.disabled) return;

      let n = count + 1;

      if (this.allowHalf && half) {
        n = count + 0.5;
      }

      if (this.currentValue === n) return;

      this.currentValue = n;
      this.$emit('on-change', n);
      this.$emit('input', n);
    },
  },
  components: {
    CoIcon,
  },
};
</script>
