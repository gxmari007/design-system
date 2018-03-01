<template>
  <div :class="classes" v-clickoutside="closeDropdown">
    <div
      class="co-color-picker__trigger"
      ref="reference"
      @click="visible = !visible">
      <span class="co-color-picker__color-wrap">
        <co-icon class="co-color-picker__empty" type="android-close"></co-icon>
        <span class="co-color-picker__color"></span>
      </span>
      <co-icon class="co-color-picker__icon" type="arrow-down-b"></co-icon>
    </div>
    <color-dropdown
      ref="popper"
      v-model="visible"></color-dropdown>
  </div>
</template>

<script>
import CoIcon from 'components/icon';
import clickoutside from 'directives/clickoutside';
import popper from 'mixins/popper';
import { oneOf } from 'utils/help';
import ColorDropdown from './color-dropdown';

export default {
  name: 'co-color-picker',
  mixins: [popper],
  directives: {
    clickoutside,
  },
  props: {
    value: {
      type: String,
    },
    size: {
      type: String,
      validator(value) {
        return oneOf(value, ['small', 'large', 'sm', 'lg']);
      },
    },
  },
  data() {
    return {
      popper: null,
    };
  },
  computed: {
    classes() {
      const prefixClass = 'co-color-picker';
      const { size } = this;

      return [prefixClass, {
        [`${prefixClass}--small`]: size === 'small' || size === 'sm',
        [`${prefixClass}--large`]: size === 'large' || size === 'lg',
      }];
    },
  },
  mounted() {
    this.popper = this.$refs.popper.$el;
  },
  methods: {
    closeDropdown() {
      this.visible = false;
    },
  },
  components: {
    CoIcon,
    ColorDropdown,
  },
};
</script>
