<template>
  <co-row class="row" type="flex" align="center" justify="middle">
    <co-col span="6" order="1">
      <co-breadcrumb>
        <co-breadcrumb-item to="/123">123</co-breadcrumb-item>
        <co-breadcrumb-item>123</co-breadcrumb-item>
      </co-breadcrumb>
    </co-col>
  </co-row>
</template>

<style lang="less">
.row {
  height: 200px;
}
.item {
  height: 50px;
  background-color: #ddd;
}
</style>
