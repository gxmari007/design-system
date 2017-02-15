<template>
  <div class="co-dropdown" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
    <div class="co-dropdown__trigger" @click="onClick">
      <slot></slot>
    </div>
    <dropdown :show="show" :placement="placement">
      <slot name="menu"></slot>
    </dropdown>
  </div>
</template>

<script>
import { oneOf } from 'utils/help';
// components
import Dropdown from 'components/select/select-dropdown';

export default {
  name: 'co-dropdown',
  props: {
    // 触发方式
    trigger: {
      type: String,
      default: 'click',
      validate(val) {
        return oneOf(val, ['click', 'hover', 'custom']);
      },
    },
    // 菜单的位置
    placement: {
      type: String,
      default: 'bottom',
      validate(val) {
        return oneOf(val, ['bottom', 'bottom-start', 'bottom-end']);
      },
    },
  },
  data() {
    return {
      show: false,
      timeId: null,
    };
  },
  methods: {
    onClick() {
      if (this.trigger !== 'click') return;

      this.show = !this.show;
    },
    onMouseEnter() {
      if (this.trigger !== 'hover') return;
      if (this.timeId) {
        clearTimeout(this.timeId);
      }

      this.timeId = setTimeout(() => {
        this.show = true;
      }, 250);
    },
    onMouseLeave() {
      if (this.trigger !== 'hover') return;
      if (this.timeId) {
        clearTimeout(this.timeId);
      }

      this.timeId = setTimeout(() => {
        this.show = false;
      }, 150);
    },
  },
  components: {
    Dropdown,
  },
};
</script>
