<template>
  <li :class="classes" role="menuitem" @click="onClick">
    <slot />
  </li>
</template>

<script>
export default {
  name: 'CoMenuItem',
  props: {
    // item 的唯一标志
    name: String,
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      selected: false,
    };
  },
  computed: {
    classes() {
      const { disabled } = this;
      const prefixClass = 'co-menu__item';

      return [prefixClass, {
        [`${prefixClass}--disabled`]: disabled,
      }];
    },
  },
  methods: {
    onClick() {

    },
  },
};
</script>
