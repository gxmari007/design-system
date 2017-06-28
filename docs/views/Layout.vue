<template>
  <div>
    <!-- <co-tree
      style="margin-bottom: 10px;"
      :data="tree"
      :props="defaultProps"
      node-key="id"
      checkable
      :default-expand-keys="[1, 6]"
      :default-checked-keys="[4, 7]"></co-tree> -->
    <co-rate v-model="value" :allow-half="true" disabled @on-change="onChange"></co-rate>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: 3.8,
      tree: [
        { id: 1, title: '一级 1', children: [ { id: 4, title: '一级 1-1' } ] },
        {
          id: 2,
          title: '一级 2',
          children: [
            { id: 5, title: '一级 2-1', children: [
              { id: 7, title: '2-1-1' },
              { id: 8, title: '2-1-2', children: [
                { id: 9, title: '2-2-1' },
                { id: 10, title: '2-2-2' },
              ] },
            ] },
            { id: 6, title: '2-2' },
          ],
        },
        { id: 3, title: '一级 3' },
      ],
      defaultProps: {
        label: 'title',
        children: 'children',
      },
    };
  },
  methods: {
    onChange(count) {
      console.log(count);
    },
  },
};
</script>

<style>
body {
  padding: 50px;
}
</style>
