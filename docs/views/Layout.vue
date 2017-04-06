<template>
  <div class="test">
    <co-tooltip placement="top" content="测试提示文本" disabled always>
      <co-button type="ghost">提示</co-button>
    </co-tooltip>
    <co-tooltip placement="top-start" content="测试提示文本" :animation="false">
      <co-button type="ghost">提示</co-button>
    </co-tooltip>
    <co-tooltip placement="top-end" content="测试提示文本" :delay="{ show: 200, hide: 200 }">
      <co-button type="ghost">提示</co-button>
    </co-tooltip>
    <co-tooltip placement="right-start" content="测试提示文本" :delay="1000">
      <co-button type="ghost">提示</co-button>
    </co-tooltip>
    <co-tooltip placement="right" content="测试提示文本">
      <co-button type="ghost">提示</co-button>
      <div slot="content">
        <i>自定义文本</i>
      </div>
    </co-tooltip>
    <co-tooltip placement="right-end" content="测试提示文本">
      <co-button type="ghost">提示</co-button>
    </co-tooltip>
    <co-tooltip placement="bottom" content="测试提示文本">
      <co-button type="ghost">提示</co-button>
    </co-tooltip>
    <co-tooltip placement="bottom-start" content="测试提示文本">
      <co-button type="ghost">提示</co-button>
    </co-tooltip>
    <co-tooltip placement="bottom-end" content="测试提示文本">
      <co-button type="ghost">提示</co-button>
    </co-tooltip>
    <co-tooltip placement="left" content="测试提示文本">
      <co-button type="ghost">提示</co-button>
    </co-tooltip>
    <co-tooltip placement="left-start" content="测试提示文本">
      <co-button type="ghost">提示</co-button>
    </co-tooltip>
    <co-tooltip placement="left-end" content="测试提示文本">
      <co-button type="ghost">提示</co-button>
    </co-tooltip>
  </div>
</template>

<script>
export default {

};
</script>

<style>
.test {
  padding: 80px;
  height: 2000px;
}
</style>
