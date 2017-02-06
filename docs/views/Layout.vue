<template>
  <div class="test">
    <co-checkbox-group>
      <co-checkbox>hello</co-checkbox>
      <co-checkbox>hello</co-checkbox>
    </co-checkbox-group>
    <br>
    <co-radio-group v-model="test">
      <co-radio label="123">教师数</co-radio>
      <co-radio label="321">教师数</co-radio>
    </co-radio-group>
    {{ test }}
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
