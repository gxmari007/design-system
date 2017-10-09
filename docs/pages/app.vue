<template>
  <div id="demo">
    <co-row class="box" type="flex" justify="space-between">
      <co-col span="4" class="item">col-6</co-col>
      <co-col span="4" class="item">col-6</co-col>
      <co-col span="4" class="item">col-6</co-col>
      <co-col span="4" class="item">col-6</co-col>
    </co-row>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      tree: [
        {
          label: '一级',
          children: [
            { label: '二级 1' },
            { label: '二级 2' },
          ],
        },
        { label: '一级 2' },
      ],
    };
  },
}
</script>

<style lang="less">
#demo {
  padding: 20px;
}
.box {
  background-color: gray;
}
.item {
  height: 30px;
  background-color: #0e90d2;
  color: #fff;
  text-align: center;
}
</style>
