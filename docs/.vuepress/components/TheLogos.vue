<template>
  <div class="logos">
    <img width="150" src="../assets/ant-design.svg" alt="Ant Design" />
    <span class="logos__plus">+</span>
    <img width="160" src="../assets/vue.svg" alt="Vue" />
  </div>
</template>

<script>
export default {
  name: 'TheLogos',
};
</script>

<style lang="less">
.logos {
  > * {
    display: inline-block;
    vertical-align: middle;
  }

  &__plus {
    font-size: 30px;
    color: #aaa;
    margin: 0 20px;
  }
}
</style>
