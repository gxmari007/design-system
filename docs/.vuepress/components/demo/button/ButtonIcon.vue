<template>
  <code-box class="button-demo" :code="code">
    <template slot="demo">
      <co-button type="primary" shape="circle" icon="search" />
      <co-button type="primary" icon="search">Search</co-button>
      <co-button shape="circle" icon="search" />
      <co-button icon="search">Search</co-button>
      <co-button type="dashed" shape="circle" icon="search" />
      <co-button type="dashed" icon="search">Search</co-button>
    </template>
    <template slot="title">图标按钮</template>
    <template slot="desc">当需要在 Button 内嵌入 Icon 时，可以设置 icon 属性，或者直接在 Button 内使用 Icon 组件。如果想控制 Icon 具体的位置，只能直接使用 Icon 组件，而非 icon 属性。</template>
  </code-box>
</template>

<script>
import { icon } from './code';

export default {
  name: 'ButtonIcon',
  data() {
    return {
      code: icon,
    };
  },
};
</script>

<style src="./button.less" lang="less"></style>
