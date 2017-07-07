<template>
  <div>
    <co-button type="ghost" @click.native="onClick">消息</co-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: true,
    };
  },
  methods: {
    onClick() {
      this.$message.error('发送消息');
    },
  },
};
</script>

<style>
body {
  padding: 50px;
}
</style>
