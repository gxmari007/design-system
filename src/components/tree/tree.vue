<template>
  <ul class="co-tree">
    <co-tree-item
      v-for="(item, index) in data"
      :key="index"
      :data="item"></co-tree-item>
  </ul>
</template>

<script>
import CoTreeItem from './tree-item';

export default {
  name: 'co-tree',
  props: {
    data: Array,
    multiple: {
      type: Boolean,
      default: false,
    },
    checkable: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    CoTreeItem,
  },
};
</script>
