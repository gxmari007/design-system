<template>
  <code-box class="button-demo" :code="code">
    <template slot="demo">
      <co-button type="primary">Primary</co-button>
      <co-button type="primary" disabled>Primary(disabled)</co-button>
      <br />
      <co-button>Default</co-button>
      <co-button disabled>Default(disabled)</co-button>
      <br />
      <co-button type="dashed">Dashed</co-button>
      <co-button type="dashed" disabled>Dashed(disabled)</co-button>
      <br />
      <div style="padding: 8px 8px 0 8px;background: rgb(190, 200, 200);">
        <co-button ghost>Ghost</co-button>
        <co-button ghost disabled>Ghost(disabled)</co-button>
      </div>
    </template>
    <template slot="title">不可用状态</template>
    <template slot="desc">添加 disabled 属性即可让按钮处于不可用状态，同时按钮样式也会改变。</template>
  </code-box>
</template>

<script>
import { disabled } from './code';

export default {
  name: 'ButtonDisabled',
  data() {
    return {
      code: disabled,
    };
  },
};
</script>


<style src="./button.less" lang="less"></style>
