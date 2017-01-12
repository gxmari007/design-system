<template>
  <co-row class="row" type="flex" align="center" justify="middle" :gutter="20">
    <co-col span="6" order="3">
      <div class="item">1</div>
    </co-col>
    <co-col span="6" order="2">
      <div class="item">2</div>
    </co-col>
    <co-col span="6" order="1">
      <div class="item">3</div>
    </co-col>
  </co-row>
</template>

<script>
import { CoRow, CoCol, CoLoading } from 'coview';

export default {
  components: {
    CoRow,
    CoCol,
    CoLoading,
  },
};
</script>

<style lang="less">
.row {
  height: 200px;
}
.item {
  height: 50px;
  background-color: #ddd;
}
</style>
