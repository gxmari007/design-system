<template>
  <div id="demo">
    <co-tree :data="tree" checkable></co-tree>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      tree: [
        {
          label: '一级',
          children: [
            { label: '二级 1' },
            { label: '二级 2' },
          ],
        },
        { label: '一级 2' },
      ],
    };
  },
}
</script>

<style lang="less">
#demo {
  padding: 20px;
}
</style>
