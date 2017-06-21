<template>
  <div>
    <co-tree :data="tree"></co-tree>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tree: [
        { label: '一级 1', children: [ { label: '一级 1-1' } ] },
        {
          label: '一级 2',
          children: [
            { label: '子节点', children: [ { label: '二级子节点' } ] },
            { label: '子节点' },
          ],
        },
        { label: '一级 3' },
      ],
    };
  },
};
</script>

<style>
body {
  padding: 50px;
}
</style>
