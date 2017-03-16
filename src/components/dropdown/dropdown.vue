<template>
  <div
    class="co-dropdown"
    v-clickoutside="closeMenu"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave">
    <div
      class="co-dropdown__trigger"
      ref="reference"
      @click="onClick">
      <slot></slot>
    </div>
    <dropdown :show="show" :placement="placement" :transition="transition">
      <slot name="menu"></slot>
    </dropdown>
  </div>
</template>

<script>
import { oneOf } from 'utils/help';
// components
import Dropdown from 'components/select/select-dropdown';
// directives
import clickoutside from 'directives/clickoutside';
// mixins
import emitter from 'mixins/emitter';

export default {
  name: 'co-dropdown',
  mixins: [emitter],
  directives: { clickoutside },
  props: {
    // 触发方式
    trigger: {
      type: String,
      default: 'hover',
      validate(val) {
        return oneOf(val, ['hover', 'click', 'custom']);
      },
    },
    // 菜单的位置
    placement: {
      type: String,
      default: 'bottom',
      validate(val) {
        return oneOf(val, ['top', 'top-start', 'top-end', 'bottom', 'bottom-start',
          'bottom-end', 'left', 'left-start', 'left-end', 'right', 'right-start', 'right-end']);
      },
    },
  },
  data() {
    return {
      show: false,
      timeId: null,
    };
  },
  computed: {
    isSubDropdown() {
      const parent = this.$parent.$parent.$parent;

      if (parent.$options.componentName === 'co-dropdown') {
        return parent;
      }

      return false;
    },
    transition() {
      return this.isSubDropdown ? 'co-fade' : 'co-select--slide';
    },
  },
  created() {
    this.$on('on-click', this.onDropdownClick);
  },
  methods: {
    closeMenu() {
      if (this.trigger !== 'click') return;

      this.show = false;
    },
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
    onDropdownClick(label) {
      if (this.isSubDropdown) {
        this.dispatch('co-dropdown', 'on-click', label);
      } else {
        this.$emit('dropdown-click', label);
      }

      this.show = false;
    },
  },
  components: {
    Dropdown,
  },
};
</script>
