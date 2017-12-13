<template>
  <div id="demo">
    <co-icon type="chrome" style="font-size: 28px;" />
  </div>
</template>

<script>
import { CoIcon } from 'coview';

console.log(CoIcon);
export default {
  name: 'app'
}
</script>

<style lang="less" scoped>
#demo {
  padding: 20px;
}
.example {
  padding: 16px;
  border: 1px solid #d2eafb;
  border-radius: 4px;
  background-color: #ecf6fd;
}
</style>
