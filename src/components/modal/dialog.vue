<template>
  <co-modal v-model="visible">
  </co-modal>
</template>

<script>
import CoModal from './modal.vue';

export default {
  name: 'co-dialog',
  data() {
    return {
      visible: false,
    };
  },
  components: {
    CoModal,
  },
};
</script>
