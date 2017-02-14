<template>
  <div class="test">
    <co-select class="select" v-model="model" style="width: 220px;" placeholder="请选择..." size="small" clearable>
      <co-option value="选项一">选项一</co-option>
      <co-option value="选项二">选项二</co-option>
      <co-option value="选项三" disabled>选项三</co-option>
    </co-select>
    <co-select class="select" v-model="model" style="width: 220px;" placeholder="请选择..." clearable>
      <co-option value="选项一">选项一</co-option>
      <co-option value="选项二">选项二</co-option>
      <co-option value="选项三" disabled>选项三</co-option>
    </co-select>
    <co-select class="select" v-model="model" style="width: 220px;" placeholder="请选择..." size="large" clearable>
      <co-option value="选项一">选项一</co-option>
      <co-option value="选项二">选项二</co-option>
      <co-option value="选项三" disabled>选项三</co-option>
    </co-select>
    <co-back-top>back top</co-back-top>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: '3',
    };
  },
};
</script>

<style>
.test {
  height: 2000px;
  padding: 100px;
}
</style>
