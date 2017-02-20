<template>
  <div class="test">
    <co-input-number v-model="model" :step="1.1" :max="5" :min="1" disabled></co-input-number>
    <br>
    {{ model }}
    <co-back-top></co-back-top>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: 0,
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
