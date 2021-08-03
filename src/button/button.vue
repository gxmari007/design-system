<template>
  <button class="inline-block leading-normal text-sm text-black rounded-sm border border-gray-300 py-1 px-3.5">
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'VButton',
  props: {
    type: { type: String, default: 'default' },
  },
});
</script>
