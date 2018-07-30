<template>
  <code-box class="button-demo" :code="code">
    <template slot="demo">
      <co-button type="primary">Primary</co-button>
      <co-button>Default</co-button>
      <co-button type="dashed">Dashed</co-button>
      <co-button type="danger">Danger</co-button>
    </template>
    <template slot="title">按钮类型</template>
    <template slot="desc">按钮有四种类型：主按钮、次按钮、虚线按钮、危险按钮。主按钮在同一个操作区域最多出现一次。</template>
  </code-box>
</template>

<script>
import { basic } from './code';

export default {
  name: 'ButtonBasic',
  data() {
    return {
      code: basic,
    };
  },
}
</script>

<style src="./button.less" lang="less"></style>
