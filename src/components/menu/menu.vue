<template>
  <ul :class="classes">
    <slot></slot>
  </ul>
</template>

<script>
import { oneOf } from 'utils/help';

export default {
  name: 'co-menu',
  props: {
    mode: {
      type: String,
      default: 'horizontal',
      validator(value) {
        return oneOf(value, ['horizontal', 'vertical']);
      },
    },
    theme: {
      type: String,
      default: 'light',
      validator(value) {
        return oneOf(value, ['light', 'primary', 'dark']);
      },
    },
    activeName: [String, Number],
    openNames: {
      type: Array,
      default() { return []; },
    },
    accordion: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      active: this.activeName,
    };
  },
  computed: {
    classes() {
      const prefixClass = 'co-menu';

      return [
        prefixClass,
        `${prefixClass}--${this.mode}`,
        `${prefixClass}--${this.theme}`,
      ];
    },
  },
  watch: {
    activeName(newVal) {
      this.active = newVal;
    },
  },
  created() {
    this.$on('on-menu-item-click', this.onMenuItemClick);
  },
  methods: {
    onMenuItemClick(name) {
      this.active = name;
      this.$emit('on-select', name);
    },
  },
};
</script>
