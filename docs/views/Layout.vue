<template>
  <div style="padding: 20px; width: 800px;">
    <co-steps :active="active" direction="horizontal">
      <co-step title="步骤 1" description="这是一段很长很长很长的描述性文字"></co-step>
      <co-step title="步骤 2" description="这是一段很长很长很长的描述性文字"></co-step>
      <co-step title="步骤 3" description="这是一段很长很长很长的描述性文字"></co-step>
      <co-step title="步骤 4">
        <span slot="description">哈哈哈</span>
      </co-step>
    </co-steps>
    <co-button @click.native="onClick">下一步</co-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
    };
  },
  methods: {
    onClick() {
      if (this.active === 4) {
        this.active = 0;
      } else {
        this.active += 1;
      }
    },
  },
};
</script>

<style lang="less">
</style>
