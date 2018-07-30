<template>
  <code-box class="button-demo" :code="code">
    <template slot="demo">
      <co-button type="primary" loading>Loading</co-button>
      <co-button type="primary" size="small" loading>Loading</co-button>
      <co-button shape="circle" loading />
      <co-button type="primary" shape="circle" loading />
      <co-button type="primary" :loading="loading" @click.native="enterLoading">Click me!</co-button>
      <co-button type="primary" icon="poweroff" :loading="iconLoading" @click.native="enterIconLoading">Click me!</co-button>
    </template>
    <template slot="title">加载中状态</template>
    <template slot="desc">添加 loading 属性即可让按钮处于加载状态，最后两个按钮演示点击后进入加载状态。</template>
  </code-box>
</template>

<script>
import { loading } from './code';

export default {
  name: 'ButtonLoading',
  data() {
    return {
      code: loading,
      loading: false,
      iconLoading: false,
    };
  },
  methods: {
    enterLoading() {
      this.loading = true;
    },
    enterIconLoading() {
      this.iconLoading = true;
    },
  },
};
</script>

<style src="./button.less" lang="less"></style>
