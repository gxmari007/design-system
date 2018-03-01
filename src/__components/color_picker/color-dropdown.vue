<template>
  <transition name="co-slide">
    <div v-show="value" class="co-color-picker__dropdown">
      <div class="co-color-picker__ctrl">
        <span class="co-color-picker__value"></span>
        <co-button type="link" size="small">清除</co-button>
        <co-button type="primary" size="small">确定</co-button>
      </div>
    </div>
  </transition>
</template>

<script>
import { CoButton } from 'components/button';

export default {
  name: 'color-dropdown',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    CoButton,
  },
};
</script>
