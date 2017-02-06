<template>
  <div class="test">
    <co-radio v-model="test" label="123">教师数</co-radio>
    <co-radio v-model="test" label="321">教师数</co-radio>
  </div>
</template>

<script>
export default {
  data() {
    return {
      test: '',
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
