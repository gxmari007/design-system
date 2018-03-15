<template>
  <li :class="classes" role="menuitem" @click="onClick">
    <slot />
  </li>
</template>

<script>
export default {
  name: 'CoMenuItem',
  inject: ['rootMenu'],
  props: {
    // item 的唯一标志
    name: {
      type: String,
      required: true,
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classes() {
      const { selected, disabled } = this;
      const prefixClass = 'co-menu__item';

      return [prefixClass, {
        [`${prefixClass}--selected`]: selected,
        [`${prefixClass}--disabled`]: disabled,
      }];
    },
    selected() {
      return this.rootMenu.selectedItems.indexOf(this.name) > -1;
    },
  },
  created() {
    this.rootMenu.addItem(this);
  },
  beforeDestroy() {
    this.rootMenu.removeItem(this);
  },
  methods: {
    onClick() {
      this.rootMenu.updateSelectItems(this.name);
    },
  },
};
</script>
