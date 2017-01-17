<template>
  <div>
    <button @click="show1 = true">modal</button>
    <co-modal v-model="show1" title="标题" @ok="onOpen" @cancel="onClose">
      123
      <template slot="footer">
        <button>diy</button>
      </template>
    </co-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show1: false,
    };
  },
  methods: {
    onOpen() {
      console.log('open');
    },
    onClose() {
      console.log('close');
    },
  },
};
</script>
