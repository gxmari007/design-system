<template>
  <code-box class="button-demo" :code="code">
    <template slot="demo">
      <h4>Basic</h4>
      <co-button-group>
        <co-button>Cancel</co-button><co-button>OK</co-button>
      </co-button-group>
      <co-button-group>
        <co-button disabled>L</co-button><co-button disabled>M</co-button><co-button disabled>R</co-button>
      </co-button-group>
      <co-button-group>
        <co-button>L</co-button><co-button>M</co-button><co-button>R</co-button>
      </co-button-group>
      <h4>With Icon</h4>
      <co-button-group>
        <co-button type="primary">
          <co-icon type="left" />Go back
        </co-button><co-button type="primary">
          Go forward<co-icon type="right" />
        </co-button>
      </co-button-group>
      <co-button-group>
        <co-button type="primary" icon="cloud" /><co-button type="primary" icon="cloud-download" />
      </co-button-group>
    </template>
    <template slot="title">按钮组合</template>
    <template slot="desc">可以将多个 Button 放入 Button.Group 的容器中。通过设置 size 为 large small 分别把按钮组合设为大、小尺寸。若不设置 size，则尺寸为中。</template>
  </code-box>
</template>

<script>
import { group } from './code';

export default {
  name: 'ButtonGroup',
  data() {
    return {
      code: group,
    };
  },
}
</script>

<style src="./button.less" lang="less"></style>
