<template>
  <div
    class="co-dropdown"
    v-clickoutside="closeMenu"
    @mouseenter="onMouseenter"
    @mouseleave="onMouseleave">
    <div
      class="co-dropdown__trigger"
      ref="reference"
      @click="onClick">
      <slot></slot>
    </div>
    <transition name="co-slide">
      <div
        class="co-dropdown__wrapper"
        v-show="visible"
        ref="popper"
        @mouseenter="onMenuMouseenter"
        @mouseleave="onMenuMouseleave">
        <slot name="menu"></slot>
      </div>
    </transition>
  </div>
</template>

<script>
import { oneOf } from 'utils/help';
// directives
import clickoutside from 'directives/clickoutside';
// mixins
import emitter from 'mixins/emitter';
import popper from 'mixins/popper';

export default {
  name: 'co-dropdown',
  mixins: [emitter, popper],
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
    show: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      timeoutID: null,
    };
  },
  computed: {
    isSubDropdown() {
      const parent = this.$parent.$parent;

      return parent.$options.name === 'co-dropdown';
    },
  },
  watch: {
    show(newVal) {
      if (this.trigger === 'custom') {
        this.visible = newVal;
      }
    },
  },
  created() {
    this.appendBody = !this.isSubDropdown;
    this.$on('on-click', this.onDropdownClick);
  },
  methods: {
    closeMenu() {
      if (this.trigger !== 'click') return;

      this.visible = false;
    },
    onClick() {
      if (this.trigger !== 'click') return;

      this.visible = !this.visible;
    },
    onMouseenter() {
      if (this.trigger !== 'hover') return;
      if (this.timeoutID) {
        clearTimeout(this.timeoutID);
      }

      this.timeoutID = setTimeout(() => {
        this.visible = true;
      }, 250);
    },
    onMouseleave() {
      if (this.trigger !== 'hover') return;
      if (this.timeoutID) {
        clearTimeout(this.timeoutID);
      }

      this.timeoutID = setTimeout(() => {
        this.visible = false;
      }, 150);
    },
    onMenuMouseenter() {
      if (this.isSubDropdown) return;

      this.onMouseenter();
    },
    onMenuMouseleave() {
      if (this.isSubDropdown) return;

      this.onMouseleave();
    },
    onDropdownClick(label) {
      if (this.isSubDropdown) {
        this.dispatch('co-dropdown', 'on-click', label);
      } else {
        this.$emit('dropdown-click', label);
      }

      this.visible = false;
    },
  },
};
</script>
