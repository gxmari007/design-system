<template>
  <section class="markdown">{{doc}}</section>
</template>

<script>
import doc from '~/doc.md';

export default {
  data() {
    return {
      doc,
    };
  },
};
</script>
