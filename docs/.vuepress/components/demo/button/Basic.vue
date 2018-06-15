<template>
  <co-row :gutter="16">
    <co-col span="12">
      <code-box :code="code.basic">
        <template slot="demo">
          <co-button type="primary">Primary</co-button>
          <co-button>Default</co-button>
          <co-button type="dashed">Dashed</co-button>
          <co-button type="danger">Danger</co-button>
        </template>
        <template slot="title">按钮类型</template>
        <template slot="desc">按钮有四种类型：主按钮、次按钮、虚线按钮、危险按钮。主按钮在同一个操作区域最多出现一次。</template>
      </code-box>
    </co-col>
  </co-row>
</template>

<script>
import code from './code';

export default {
  name: 'Basic',
  data() {
    return {
      code,
    };
  },
}
</script>
