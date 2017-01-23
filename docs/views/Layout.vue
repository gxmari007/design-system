<template>
  <div>
    <co-input style="width: 180px; margin: 10px; vertical-align: top;" v-model="value" placeholder="名称" icon="search"></co-input>
    <co-input style="margin: 10px; width: 180px; vertical-align: top;" placeholder="名称" icon="search" size="small"></co-input>
    <co-input style="margin: 10px; width: 180px; vertical-align: top;" placeholder="名称" icon="search" size="large"></co-input>
    <co-input style="width: 180px; margin: 10px; vertical-align: top;" type="textarea" placeholder="名称" :rows="4"></co-input>
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
