<template>
  <div>
    <co-tree style="margin-bottom: 10px;" :data="tree" checkable></co-tree>
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
            { label: '一级 2-1', children: [
              { label: '一级 2-1-1' },
              { label: '2-1-2' },
            ] },
            { label: '2-2' },
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
