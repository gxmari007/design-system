<template>
  <div>
    <co-tag v-for="tag in tags" :key="tag" closeable @on-close="onClose(tag)">{{ tag.label }}</co-tag>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tags: [
        { label: '标签1' },
        { label: '标签2' },
        { label: '标签3' },
        { label: '标签4' },
        { label: '标签5' },
        { label: '标签6' },
      ],
    };
  },
  methods: {
    onClose(tag) {
      this.tags.splice(this.tags.indexOf(tag), 1);
    },
  },
};
</script>

<style>
body {
  padding: 50px;
}
.co-tag {
  margin-right: 8px;
}
</style>
