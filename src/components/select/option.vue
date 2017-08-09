<template>
  <li :class="classes" @click="onClick">
    <slot>{{ label || value }}</slot>
  </li>
</template>

<script>
// mixins
import emitter from 'mixins/emitter';

export default {
  name: 'co-option',
  mixins: [emitter],
  props: {
    // 选项值，选中的话会赋值给父级 select 组件绑定的 model
    value: {
      type: null,
      required: true,
    },
    // 选项文本，默认会优先读取 slot，无 slot 的时候优先读取 label
    // 如果 label 也没有则把 value 格式化显示出来
    label: {
      type: String,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classes() {
      const prefixClass = 'co-option';

      return [prefixClass, {
        [`${prefixClass}--disabled`]: this.disabled,
        [`${prefixClass}--active`]: this.active,
      }];
    },
    parent() {
      let parent = this.$parent;

      while (parent && parent.$options.name !== 'co-select') {
        parent = parent.$parent;
      }

      return parent;
    },
    select() {
      let parent = this.$parent;

      while (parent && parent.$options.name !== 'co-select') {
        parent = parent.$parent;
      }

      return parent;
    },
    active() {
      if (this.parent) {
        // 判断是否为多项选择
        if (Array.isArray(this.parent.value)) {
          return this.parent.value.indexOf(this.value) > -1;
        }

        return this.parent.value === this.value;
      }

      return false;
    },
  },
  mounted() {
    this.parent.slotChange();
  },
  beforeDestroy() {
    this.parent.slotChange();
  },
  methods: {
    onClick() {
      if (!this.disabled) {
        this.dispatch('co-select', 'select-option', this.value);
      }
    },
  },
};
</script>
