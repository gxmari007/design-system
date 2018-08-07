<template>
  <code-box class="button-demo" :code="code">
    <template slot="demo">
      <div style="background: rgb(190, 200, 200);padding: 26px 16px 14px;">
        <co-button type="primary" ghost>Primary</co-button>
        <co-button ghost>Default</co-button>
        <co-button type="dashed" ghost>Dashed</co-button>
        <co-button type="danger" ghost>Danger</co-button>
      </div>
    </template>
    <template slot="title">幽灵按钮</template>
    <template slot="desc">幽灵按钮将其他按钮的内容反色，背景变为透明，常用在有色背景上。</template>
  </code-box>
</template>

<script>
import { ghost } from './code';

export default {
  name: 'ButtonGroup',
  data() {
    return {
      code: ghost,
    };
  },
};
</script>

<style src="./button.less" lang="less"></style>
