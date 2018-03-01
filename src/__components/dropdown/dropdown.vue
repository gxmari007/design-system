<template>
  <div
    class="co-dropdown"
    v-clickoutside="close"
    @mouseenter="onMouseenter"
    @mouseleave="onMouseleave">
    <div class="co-dropdown__trigger" @click="onClick">
      <slot></slot>
    </div>
    <dropdown-menu-wrapper
      :class="{ 'co-dropdown__wrapper--sub-dropdown': isSubDropdown }"
      :placement="placement"
      :append-body="!isSubDropdown"
      @mouseenter.native="onMenuMouseenter"
      @mouseleave.native="onMenuMouseleave">
      <slot name="menu"></slot>
    </dropdown-menu-wrapper>
  </div>
</template>

<script>
import { oneOf } from 'utils/help';
import clickoutside from 'directives/clickoutside';
import emitter from 'mixins/emitter';
import { placementValues } from 'mixins/popper';
import DropdownMenuWrapper from './dropdown-menu-wrapper';

export default {
  name: 'CoDropdown',
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
    // 菜单弹出位置
    placement: {
      type: String,
      default: 'bottom',
      validator(value) {
        return oneOf(value, placementValues);
      },
    },
    // 控制菜单的显示与隐藏，只在 trigger="custom" 时有效
    visible: {
      type: Boolean,
      default: false,
    },
    // 是否在点击菜单项后隐藏菜单
    clickHide: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      show: false,
      timeoutID: null,
      popperElm: null,
      dropdown: null,
    };
  },
  computed: {
    isSubDropdown() {
      let parent = this.$parent;
      let result = false;

      while (parent) {
        if (parent.$options.name === 'CoDropdown') {
          this.dropdown = parent;
          result = true;
          break;
        } else {
          parent = parent.$parent;
        }
      }

      return result;
    },
    hideOnClick() {
      return this.isSubDropdown ? this.dropdown.hideOnClick : this.clickHide;
    },
  },
  watch: {
    visible: {
      immediate: true,
      handler(newVal) {
        this.$nextTick(() => {
          if (this.trigger === 'custom') {
            this.show = newVal;
          }
        });
      },
    },
    show(newVal) {
      this.broadcast('DropdownMenuWrapper', 'visible-change', newVal);
      this.$emit('on-visible-change', newVal);
    },
  },
  created() {
    this.$on('dropdown-click', this.onDropdownClick);
  },
  methods: {
    open() {
      if (!this.popperElm) return;
      if (this.timeoutID) {
        clearTimeout(this.timeoutID);
      }

      this.timeoutID = setTimeout(() => {
        this.show = true;
      }, 250);
    },
    close() {
      if (this.trigger === 'custom') return;
      if (!this.popperElm) return;
      if (this.timeoutID) {
        clearTimeout(this.timeoutID);
      }

      this.timeoutID = setTimeout(() => {
        this.show = false;
      }, 150);
    },
    onClick() {
      if (!this.popperElm || this.trigger !== 'click') return;

      this.show = !this.show;
    },
    onMouseenter() {
      if (this.trigger !== 'hover') return;

      this.open();
    },
    onMouseleave() {
      if (this.trigger !== 'hover') return;

      this.close();
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
        this.dispatch('CoDropdown', 'dropdown-click', label);
      } else {
        this.$emit('on-dropdown-click', label);
      }

      if (this.hideOnClick) {
        this.show = false;
      }
    },
  },
  components: {
    DropdownMenuWrapper,
  },
};
</script>
