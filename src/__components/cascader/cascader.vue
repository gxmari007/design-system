<template>
  <div class="co-cascader" v-clickoutside="closeDropdown">
    <div class="co-cascader__content" ref="reference">
      <co-input
        :icon="icon"
        readonly
        @click.native="switchDropdown"></co-input>
      <co-icon
        class="co-cascader__remove"
        v-show="remove"
        type="ios-close"></co-icon>
    </div>
    <transition>
      <div v-show="visible" class="co-cascader__dropdown" ref="popper">
      </div>
    </transition>
  </div>
</template>

<script>
import CoInput from 'components/input';
import CoIcon from 'components/icon';
import popper from 'mixins/popper';
import clickoutside from 'directives/clickoutside';

export default {
  name: 'co-cascader',
  mixins: [popper],
  directives: { clickoutside },
  props: {
    value: {
      type: Array,
      default: () => [],
    },
    data: {
      type: Array,
      default: () => [],
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      remove: false,
    };
  },
  computed: {
    icon() {
      return this.remove ? null : 'arrow-down-b';
    },
  },
  methods: {
    switchDropdown() {
      if (this.disabled) return;

      this.visible = !this.visible;
    },
    closeDropdown() {
      this.visible = false;
    },
  },
  components: {
    CoInput,
    CoIcon,
  },
};
</script>
