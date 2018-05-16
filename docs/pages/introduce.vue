<template>
  <component :is="'button'">button</component>
</template>

<script>
import doc from '~/doc.md';

export default {
  computed: {
    doc() {
      return doc;
    },
  },
};
</script>
