<template>
  <div class="co-date-picker" v-clickoutside="hide">
    <div class="co-date-picker__reference" ref="reference">
      <co-input
        :placeholder="placeholder"
        icon="ios-calendar-outline"
        @click.native="show"></co-input>
    </div>
    <transition name="co-slide">
      <div v-show="visible" class="co-date-picker__dropdown" ref="popper">
        <co-date-panel></co-date-panel>
      </div>
    </transition>
  </div>
</template>

<script>
import popper from 'mixins/popper';
import clickoutside from 'directives/clickoutside';
import CoInput from 'components/input';
import CoDatePanel from './date-panel';

export default {
  name: 'co-date-picker',
  mixins: [popper],
  directives: { clickoutside },
  props: {
    value: {
      type: [Date, String],
    },
    // 重置 popper 中 placement 的初始值
    placement: {
      default: 'bottom-start',
    },
    placeholder: {
      type: String,
      default: '选择日期',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    show() {
      if (this.disabled) return;

      this.visible = true;
    },
    hide() {
      this.visible = false;
    },
  },
  components: {
    CoInput,
    CoDatePanel,
  },
};
</script>
