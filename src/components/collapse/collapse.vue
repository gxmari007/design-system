<template>
  <div class="co-collapse">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'co-collapse',
  props: {
    value: [String, Array],
    accordion: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      actives: typeof this.value === 'string' ? [this.value] : [...this.value],
      childs: [],
    };
  },
  watch: {
    value(newVal) {
      this.actives = typeof newVal === 'string' ? [newVal] : [...newVal];
    },
    actives(newVal) {
      this.$emit('on-change', newVal);
    },
  },
  mounted() {
    this.updateChilds();
  },
  methods: {
    updateChilds() {
      this.childs = this.$children.filter(child => child.$options.name === 'co-collapse-panel');
    },
    slotChange() {
      this.$nextTick(() => {
        this.updateChilds();
      });
    },
    expand(key) {
      const index = this.actives.indexOf(key);

      if (index > -1) {
        this.actives.splice(index, 1);
      } else if (this.accordion) {
        this.actives = [key];
      } else {
        this.actives.push(key);
      }

      this.$emit('input', this.actives);
    },
  },
};
</script>
