<template>
  <div>
    <co-breadcrumb>
      <co-breadcrumb-item to="/">
        首页
      </co-breadcrumb-item>
      <co-breadcrumb-item to="/">我的分析</co-breadcrumb-item>
      <co-breadcrumb-item to="/">
        已发布报表
      </co-breadcrumb-item>
      <co-breadcrumb-item>学生报表</co-breadcrumb-item>
    </co-breadcrumb>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: true,
    };
  },
  methods: {
    // move(e) {
    //   const minLeft = 0;
    //   const maxLeft = parentWidth - this.$el.width;
    //   const minTop = 0;
    //   const maxTop = parentHeight - this.$el.height;
    // },
  },
};
</script>

<style>
body {
  padding: 50px;
}
.demo {
  color: #ff5500;
  padding: 0 5px;
}
</style>
