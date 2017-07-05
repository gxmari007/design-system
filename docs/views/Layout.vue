<template>
  <div>
    <co-popover v-model="show">
      <co-button>按钮</co-button>
      <div slot="content">
        测试
        <co-button @click.native="show = false">关闭</co-button>
      </div>
    </co-popover>
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
