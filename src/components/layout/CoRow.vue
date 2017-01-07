<template>
  <div :class="classes" :style="style">
    <slot></slot>
  </div>
</template>

<script>
import { oneOf } from '../../utils/help';

const preClass = 'co-row';

export default {
  name: 'CoRow',
  props: {
    type: {
      type: String,
      validate(value) {
        return oneOf(value, ['flex']);
      },
    },
    gutter: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    classes() {
      return {
        `${preClass}`: true,
        `${preClass}--flex`: this.type === 'flex',
      };
    },
    style() {
      const { gutter } = this;
      const margin = {};

      if (gutter !== 0) {
        margin.marginRight = `${-(gutter / 2)}px`;
        margin.marginLeft = margin.marginRight;
      }

      return margin;
    },
  },
};
</script>
