<template>
  <ul class="co-tree">
    <co-tree-item
      v-for="(item, index) in data"
      :key="index"
      :data="item"
      :props="props"
      :node-key="nodeKey"
      :multiple="multiple"
      :checkable="checkable"
      :indent="indent"
      :default-expand-all="defaultExpandAll"
      :default-expand-keys="defaultExpandKeys"></co-tree-item>
  </ul>
</template>

<script>
import CoTreeItem from './tree-item';

export default {
  name: 'co-tree',
  props: {
    data: {
      type: Array,
      default() { return []; },
    },
    props: {
      type: Object,
      required: true,
      default() {
        return {
          label: 'label',
          children: 'children',
        };
      },
    },
    nodeKey: String,
    // 暂未实现
    multiple: {
      type: Boolean,
      default: false,
    },
    checkable: {
      type: Boolean,
      default: false,
    },
    indent: {
      type: Number,
      default: 18,
    },
    defaultExpandAll: {
      type: Boolean,
      default: false,
    },
    defaultExpandKeys: Array,
  },
  components: {
    CoTreeItem,
  },
};
</script>
