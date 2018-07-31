<template>
  <div class="co-button-group">
    <slot></slot>
  </div>
</template>

<script>
import { oneOf } from '../../utils/help';
import { SIZE } from '../../utils/style';

export default {
  name: 'CoButtonGroup',
  props: {
    // 按钮组中按钮尺寸
    size: {
      type: String,
      validator(val) {
        return oneOf(val, SIZE);
      },
    },
  },
};
</script>
