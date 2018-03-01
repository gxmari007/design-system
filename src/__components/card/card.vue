<template>
  <div :class="classes">
    <div v-if="$slots.title" class="co-card__title">
      <slot name="title"></slot>
      <div v-if="$slots.extra" class="co-card__extra">
        <slot name="extra"></slot>
      </div>
    </div>
    <div class="co-card__body">
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
  },
  computed: {
    classes() {
      const prefix = 'co-card';
      const { border, disHover, shadow } = this;

      return [prefix, {
        [`${prefix}--border`]: border && !shadow,
        [`${prefix}--dis-hover`]: disHover && !shadow,
        [`${prefix}--shadow`]: shadow,
      }];
    },
  },
};
</script>
