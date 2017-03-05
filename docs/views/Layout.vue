<template>
  <div class="test">
    <co-button>确定</co-button>
    <co-button type="primary">取消</co-button>
    <co-button type="ghost">取消</co-button>
    <co-button type="link">链接</co-button>
    <co-button disabled>禁用</co-button>
    <hr>
    <co-button block>块级按钮</co-button>
    <hr>
    <co-button size="small">确定</co-button>
    <co-button>确定</co-button>
    <co-button size="large">确定</co-button>
    <hr>
    <co-button-group size="small">
      <co-button>我的报表</co-button>
      <co-button>共享报表</co-button>
    </co-button-group>
    <co-button-group>
      <co-button>我的报表</co-button>
      <co-button>共享报表</co-button>
    </co-button-group>
    <co-button-group size="large">
      <co-button>我的报表</co-button>
      <co-button>共享报表</co-button>
    </co-button-group>
    <hr>
    <co-button-group vertical>
      <co-button>我的报表</co-button>
      <co-button>共享报表</co-button>
    </co-button-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: 1,
    };
  },
};
</script>

<style>
.test {
  height: 800px;
  padding: 100px;
}
</style>
