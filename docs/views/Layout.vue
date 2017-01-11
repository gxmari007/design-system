<template>
  <co-row class="row" align="bottom" :gutter="20">
    <co-col :xs="{ span: 6, offset: 3 }">
      <div class="item">栅格</div>
    </co-col>
    <co-col :xs="6">
      <div class="item">栅格</div>
    </co-col>
  </co-row>
</template>

<script>
import { CoRow, CoCol } from 'coview';

export default {
  components: {
    CoRow,
    CoCol,
  },
};
</script>

<style lang="less">
.row {
  // height: 200px;
  background-color: #999;
}
.item {
  height: 50px;
  background-color: #ddd;
}
</style>
