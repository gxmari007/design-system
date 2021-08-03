<template>
  <button class="inline-block leading-normal text-sm text-current rounded py-1 px-3-1px select-none" :class="classes">
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
      border: ['default', 'primary', 'dashed'].includes(props.type),
      'border-gray-5': ['default', 'dashed'].includes(props.type),
      'border-primary-6': props.type === 'primary',
      'border-dashed': props.type === 'dashed',
      'text-white': props.type === 'primary',
      'text-primary-6': props.type === 'link',
      'hover:border-primary-5': ['default', 'primary', 'dashed'].includes(props.type),
      'hover:text-primary-5': ['default', 'dashed', 'link'].includes(props.type),
      'hover:bg-primary-5': props.type === 'primary',
      'hover:bg-black': props.type === 'text',
      'hover:bg-opacity-5': props.type === 'text',
    }));

    return {
      classes,
    };
  },
});
</script>
