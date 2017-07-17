<template>
  <li :class="classes" @click="onClick">
    <slot></slot>
  </li>
</template>

<script>
import emitter from 'mixins/emitter';

export default {
  name: 'co-menu-item',
  mixins: [emitter],
  props: {
    name: {
      type: [String, Number],
      required: true,
    },
  },
  computed: {
    classes() {
      return ['co-menu__item', {
        active: this.active,
      }];
    },
    menu() {
      let parent = this.$parent;

      while (parent && parent.$options.name !== 'co-menu') {
        parent = parent.$parent;
      }

      return parent;
    },
    submenu() {
      let parent = this.$parent;

      while (parent && parent.$options.name !== 'co-submenu') {
        parent = parent.$parent;
      }

      return parent;
    },
    active() {
      return this.menu.active === this.name;
    },
  },
  created() {
    if (this.submenu) {
      this.submenu.items.push(this);
    }
  },
  beforeDestroy() {
    if (this.submenu) {
      const { items } = this.submenu;

      items.splice(items.indexOf(this), 1);
    }
  },
  methods: {
    onClick() {
      if (this.submenu) {
        this.dispatch('co-submenu', 'on-menu-item-click');
      }

      this.dispatch('co-menu', 'on-menu-item-click', this.name);
    },
  },
};
</script>
