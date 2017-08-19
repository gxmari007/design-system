<template>
  <div class="co-color-picker">
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
    <div v-transfer-dom>
      <color-dropdown
      ref="popper"
      v-model="visible"></color-dropdown>
    </div>
  </div>
</template>

<script>
import CoIcon from 'components/icon';
import clickoutside from 'directives/clickoutside';
import transferDom from 'directives/transfer-dom';
import popper from 'mixins/popper';
import ColorDropdown from './color-dropdown';

export default {
  name: 'co-color-picker',
  mixins: [popper],
  directives: {
    clickoutside,
    transferDom,
  },
  props: {
    value: {
      type: String,
    },
  },
  components: {
    CoIcon,
    ColorDropdown,
  },
};
</script>
