<template>
  <div>
    <co-button @click.native="show1 = true">打开</co-button>
    <co-button @click.native="show1 = true" disabled>打开</co-button>
    <co-icon type="g_translate" :size="120"></co-icon>
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
