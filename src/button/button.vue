<template>
  <button
    class="inline-block leading-normal text-sm text-current rounded py-4 px-15 border select-none cursor-pointer"
    :class="classes"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'VButton',
  props: {
    type: { type: String as PropType<'default' | 'primary' | 'dashed' | 'text' | 'link'>, default: 'default' },
    disabled: { type: Boolean, default: false },
  },
  setup(props) {
    const classes = computed(() => ({
      'bg-white': props.type === 'default',
      'bg-primary-6': props.type === 'primary',
      'border-gray-5': props.disabled || ['default', 'dashed'].includes(props.type),
      'border-primary-6': !props.disabled && props.type === 'primary',
      'border-dashed': props.type === 'dashed',
      'border-transparent': ['text', 'link'].includes(props.type),
      'text-white': props.type === 'primary',
      'text-primary-6': props.type === 'link',
      'hover:border-primary-5': !props.disabled && ['default', 'primary', 'dashed'].includes(props.type),
      'hover:text-primary-5': !props.disabled && ['default', 'dashed', 'link'].includes(props.type),
      'hover:bg-primary-5': !props.disabled && props.type === 'primary',
      'hover:bg-black': !props.disabled && props.type === 'text',
      'hover:bg-opacity-5': !props.disabled && props.type === 'text',
      'disabled:bg-gray-3': props.disabled && ['default', 'primary', 'dashed'].includes(props.type),
      'disabled:text-disabled': props.disabled,
      'disabled:cursor-not-allowed': props.disabled,
    }));

    return {
      classes,
    };
  },
});
</script>
