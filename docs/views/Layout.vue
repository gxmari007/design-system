<template>
  <div>
    <co-badge :count="count">
      <co-button>按钮</co-button>
    </co-badge>
    <co-button @click.native="onClick">按钮</co-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0,
    };
  },
  methods: {
    onClick() {
      this.count = this.count === 100 ? 0 : 100;
    },
  },
};
</script>

<style>
body {
  padding: 50px;
}
</style>
