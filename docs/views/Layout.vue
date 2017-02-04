<template>
  <div class="test">
    <co-checkbox>教职工数</co-checkbox>
    <co-checkbox v-model="model" :label="{ name: 'gx' }">学生数</co-checkbox>
    {{ model }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: true,
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
