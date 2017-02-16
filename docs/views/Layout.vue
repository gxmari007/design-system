<template>
  <div class="test">
    <co-select class="select" v-model="model" style="width: 220px;" placeholder="请选择..." size="small">
      <co-option value="选项一">选项一</co-option>
      <co-option value="选项二">选项二</co-option>
      <co-option value="选项三" disabled>选项三</co-option>
    </co-select>
    <co-select class="select" v-model="model" style="width: 220px;" placeholder="请选择..." clearable>
      <co-option value="选项一">选项一</co-option>
      <co-option value="选项二">选项二</co-option>
      <co-option value="选项三" disabled>选项三</co-option>
    </co-select>
    <co-select class="select" v-model="model" style="width: 220px;" placeholder="请选择..." size="large">
      <co-option value="选项一">选项一</co-option>
      <co-option value="选项二">选项二</co-option>
      <co-option value="选项三" disabled>选项三</co-option>
    </co-select>
    <br>
    <co-dropdown trigger="click" placement="bottom-start" @dropdown-click="onDropdown">
      <a href="javascript:void(0)">click</a>
      <co-dropdown-menu slot="menu">
        <co-dropdown-item label="重命名">重命名</co-dropdown-item>
        <co-dropdown-item>数据共享</co-dropdown-item>
        <co-dropdown-item disabled>删除</co-dropdown-item>
        <co-dropdown trigger="hover" placement="right-start">
          <co-dropdown-item>项目目录</co-dropdown-item>
          <co-dropdown-menu slot="menu">
            <co-dropdown-item>coview</co-dropdown-item>
            <co-dropdown-item>vue</co-dropdown-item>
            <co-dropdown-item label="react">react</co-dropdown-item>
          </co-dropdown-menu>
        </co-dropdown>
        <co-dropdown trigger="hover" placement="right-start">
          <co-dropdown-item>目录</co-dropdown-item>
          <co-dropdown-menu slot="menu">
            <co-dropdown-item>coview</co-dropdown-item>
            <co-dropdown-item>vue</co-dropdown-item>
            <co-dropdown-item label="react">react</co-dropdown-item>
          </co-dropdown-menu>
        </co-dropdown>
      </co-dropdown-menu>
    </co-dropdown>
    <co-back-top></co-back-top>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: '3',
    };
  },
  methods: {
    onDropdown(label) {
      console.log(label);
    },
  },
};
</script>

<style>
.test {
  height: 2000px;
  padding: 100px;
}
</style>
