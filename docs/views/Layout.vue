<template>
  <div>
    <co-input style="width: 180px; margin: 10px;" v-model="value" placeholder="名称" icon="search"></co-input>
    <div>{{ value }}</div>
    <co-input style="width: 180px; margin: 10px;" type="textarea" placeholder="名称" :rows="4"></co-input>
    <div></div>
    <co-input style="margin: 10px; width: 180px;" placeholder="名称" icon="tv"></co-input>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show1: false,
      value: 'hello',
    };
  },
};
</script>
