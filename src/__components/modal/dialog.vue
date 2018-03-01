<template>
  <co-modal v-model="visible">
    <div></div>
  </co-modal>
</template>

<script>
import CoModal from './modal.vue';

export default {
  name: 'co-dialog',
  data() {
    return {
      visible: false,
      title: '',
    };
  },
  components: {
    CoModal,
  },
};
</script>
