<template>
  <div class="co-rate" @mouseleave="onMouseleave">
    <div class="co-rate__item" v-for="(item, index) in max" :key="index">
      <co-icon
        type="star"
        :style="iconStyles(index + 1)"
        @mouseenter.native="onMouseenter(index + 1)"
        @click.native="onClick(index + 1)"></co-icon>
      <co-icon
        class="co-rate__item--half"
        :style="iconStyles(index + 1)"
        type="star"
        @mouseenter.native="onMouseenter(index + 1)"
        @click.native="onClick(index + 1)"></co-icon>
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
      default: '#C6D1DE',
    },
    color: {
      type: String,
      default: '#F7BA2A',
    },
    allowHalf: {
      type: Boolean,
      default: false,
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
      this.currentValue = newVal;
      this.hoverCount = newVal;
    },
  },
  methods: {
    iconStyles(index) {
      const { hoverCount, color, voidColor } = this;

      return {
        color: hoverCount >= index ? color : voidColor,
      };
    },
    onMouseenter(index) {
      this.hoverCount = index;
    },
    onMouseleave() {
      this.hoverCount = this.currentValue;
    },
    onClick(index) {
      if (index === this.currentValue) return;

      this.currentValue = index;
      this.$emit('on-change', index);
      this.$emit('input', index);
    },
  },
  components: {
    CoIcon,
  },
};
</script>
