<template>
  <div :class="classes">
    <div v-if="$slots.title" class="co-card__head" :style="styles">
      <slot name="title"></slot>
    </div>
    <div v-if="$slots.extra" class="co-card__extra" :style="extraStyles">
      <slot name="extra"></slot>
    </div>
    <div class="co-card__body" :style="styles">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'co-card',
  props: {
    border: {
      type: Boolean,
      default: true,
    },
    disHover: {
      type: Boolean,
      default: false,
    },
    shadow: {
      type: Boolean,
      default: false,
    },
    padding: {
      type: Number,
      default: 14,
    },
  },
  computed: {
    classes() {
      const prefix = 'co-card';
      const { border, disHover, shadow } = this;

      return {
        [prefix]: true,
        [`${prefix}--border`]: border && !shadow,
        [`${prefix}--dis-hover`]: disHover && !shadow,
        [`${prefix}--shadow`]: shadow,
      };
    },
    styles() {
      const styles = {};

      if (this.padding !== 14) {
        styles.padding = `${this.padding}px`;
      }

      return styles;
    },
    extraStyles() {
      const styles = {};

      if (this.padding !== 14) {
        styles.top = `${this.padding}px`;
        styles.right = `${this.padding}px`;
      }

      return styles;
    },
  },
};
</script>
