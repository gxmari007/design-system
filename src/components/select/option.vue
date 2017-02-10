<template>
  <li :class="classes" @click="onClick">
    <slot></slot>
    <template v-if="!$slots.default && label">{{ label }}</template>
    <template v-if="!$slots.default && !label">{{ value }}</template>
  </li>
</template>

<script>
// mixins
import emitter from 'mixins/emitter';

const prefixClass = 'co-option';

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
    label: String,
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classes() {
      return {
        [prefixClass]: true,
        [`${prefixClass}--disabled`]: this.disabled,
        [`${prefixClass}--active`]: this.active,
      };
    },
    // 获取 select 父组件实例
    // 由于 option 组件可能在 option-group 中
    // 所以这里需要循环取值
    parent() {
      let parent = this.$parent;

      while (parent && parent.$options.componentName !== 'co-select') {
        parent = parent.$parent;
      }

      return parent;
    },
    active() {
      if (this.parent) {
        if (Array.isArray(this.parent.value)) {
          return this.parent.value.indexOf(this.value) > -1;
        }

        return this.parent.value === this.value;
      }

      return false;
    },
  },
  created() {
    let parent = this.$parent;

    while (parent && parent.$options.componentName !== 'co-select') {
      parent = parent.$parent;
    }

    parent.values.push(this.value);
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
