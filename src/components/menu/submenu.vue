<template>
  <li class="co-menu__submenu">
    <div
      :class="titleClasses"
      ref="reference"
      @mouseenter="onMouseenter"
      @mouseleave="onMouseleave">
      <slot name="title">{{ title }}</slot>
      <co-icon class="co-menu__submenu-icon" type="ios-arrow-down"></co-icon>
    </div>
    <transition v-if="mode === 'horizontal'" name="co-slide">
      <ul
        v-show="visible"
        ref="popper"
        class="co-menu__dropdown"
        :style="dropdownStyles"
        @mouseenter="onMouseenter"
        @mouseleave="onMouseleave">
        <slot></slot>
      </ul>
    </transition>
  </li>
</template>

<script>
import CoIcon from 'components/icon';
import CoCollapseTransition from 'components/collapse/collapse-transition';
import popper from 'mixins/popper';

export default {
  name: 'co-submenu',
  mixins: [popper],
  props: {
    name: {
      type: [String, Number],
      required: true,
    },
    title: String,
  },
  data() {
    return {
      width: 0,
      hover: false,
      timeoutID: null,
      items: [],
    };
  },
  computed: {
    menu() {
      let parent = this.$parent;

      while (parent && parent.$options.name !== 'co-menu') {
        parent = parent.$parent;
      }

      return parent;
    },
    mode() {
      return this.menu.mode;
    },
    dropdownStyles() {
      const styles = {};

      if (this.width) {
        styles.minWidth = `${this.width}px`;
      }

      return styles;
    },
    titleClasses() {
      return ['co-menu__submenu-title', {
        active: this.hover || this.active,
      }];
    },
    active() {
      return this.items.some(item => item.active);
    },
  },
  mounted() {
    if (this.mode === 'horizontal') {
      this.width = this.$refs.reference.clientWidth;
    }

    this.$on('on-menu-item-click', this.onMenuItemClick);
  },
  beforeDestroy() {
    this.clearTimer();
  },
  methods: {
    clearTimer() {
      if (this.timeoutID) {
        clearTimeout(this.timeoutID);
      }
    },
    onMouseenter() {
      this.clearTimer();

      this.timeoutID = setTimeout(() => {
        this.hover = true;
        this.visible = true;
      }, 150);
    },
    onMouseleave() {
      this.clearTimer();

      this.timeoutID = setTimeout(() => {
        this.hover = false;
        this.visible = false;
      }, 150);
    },
    onMenuItemClick() {
      this.visible = false;
    },
  },
  components: {
    CoIcon,
    CoCollapseTransition,
  },
};
</script>
