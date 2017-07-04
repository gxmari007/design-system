<template>
  <div>
    <co-tag v-for="tag in tags" :key="tag" closeable @on-close="onClose(tag)">{{ tag.label }}</co-tag>
    <br>
    <co-button @click.native="onAdd" size="small">add item</co-button>
    <co-tag type="primary">标签</co-tag>
    <co-tag type="warning" closeable>标签</co-tag>
    <co-tag type="info" size="large" closeable>标签</co-tag>
    <co-tag type="success" size="large" closeable>标签</co-tag>
    <co-switch v-model="show"></co-switch>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: true,
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
    onAdd() {
      const tag = { label: '标签' };
      this.tags.push(tag);
    },
  },
};
</script>

<style>
body {
  padding: 50px;
}
</style>
