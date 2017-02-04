<template>
  <div class="test">
    <co-checkbox-group v-model="model">
      <co-checkbox :label="123" checked>教职工数</co-checkbox>
      <co-checkbox label="xuesheng1">学生数</co-checkbox>
      <co-checkbox label="xuesheng">学生数</co-checkbox>
    </co-checkbox-group>
    {{ model }}
    <co-checkbox v-model="test" :true-label="123" :false-label="321" disabled>学生数</co-checkbox>
    {{ test }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      test: 123,
      model: [],
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
