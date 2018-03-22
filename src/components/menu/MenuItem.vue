<template>
  <li :class="classes" :style="styles" @click="onClick">
    <slot />
  </li>
</template>

<script>
import mixin from './mixin';

export default {
  name: 'CoMenuItem',
  mixins: [mixin],
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
    styles() {
      return {
        paddingLeft: `${this.indent}px`,
      };
    },
    // 判断是否选中
    selected() {
      return this.rootMenu.selectedItems.indexOf(this.name) > -1;
    },
    namePath() {
      const { name } = this;
      const path = [name];
      let parent = this.$parent;

      while (parent && parent.$options.name === 'CoSubMenu') {
        path.push(parent.name);
        parent = parent.$parent;
      }

      return path;
    },
  },
  methods: {
    onClick() {
      const {
        name,
        namePath,
        disabled,
        selected,
      } = this;

      if (!disabled) {
        this.rootMenu.updateSelectItems(name, namePath, selected);
      }
    },
  },
};
</script>
