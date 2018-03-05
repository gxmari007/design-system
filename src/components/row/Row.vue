<template>
  <div :class="classes">
    <slot />
  </div>
</template>

<script>
import { oneOf } from 'utils/help';

export default {
  name: 'CoRow',
  props: {
    // 布局模式，可选值只有 flex
    type: {
      type: String,
      validator(value) {
        return oneOf(value, ['flex']);
      },
    },
  },
  computed: {
    classes() {
      const { type } = this;
      const prefixClass = type === 'flex' ? 'co-row-flex' : 'co-row';

      return [prefixClass];
    },
  },
};
</script>
