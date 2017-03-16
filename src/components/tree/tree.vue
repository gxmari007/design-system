<template>
  <ul class="co-tree">
    <li class="co-tree__item" v-for="item in data">
      <co-icon v-show="!item.expand" class="co-tree__open-icon" type="plus-square-o" size="14"></co-icon>
      <co-icon v-show="item.expand" class="co-tree__close-icon" type="minus-square-o" size="14"></co-icon>
    </li>
  </ul>
</template>

<script>
// components
import CoIcon from 'components/icon';

export default {
  name: 'co-tree',
  props: {
    // 生成 tree 的数据，可嵌套节点数组
    data: Array,
  },
  components: {
    CoIcon,
  },
};
</script>
