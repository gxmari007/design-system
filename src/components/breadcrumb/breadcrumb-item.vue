<template>
  <span class="co-breadcrumb__item">
    <a v-if="to" class="co-breadcrumb__text" @click="onClick">
      <slot></slot>
    </a>
    <span v-else class="co-breadcrumb__text">
      <slot></slot>
    </span>
    <span v-if="!showSlot" class="co-breadcrumb__separator" v-html="separator"></span>
    <span v-else class="co-breadcrumb__separator">
      <slot name="separator"></slot>
    </span>
  </span>
</template>

<script>
export default {
  name: 'co-breadcrumb-item',
  props: {
    to: null,
    replace: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showSlot: false,
    };
  },
  computed: {
    breadcrumb() {
      let parent = this.$parent;

      while (parent && parent.$options.name !== 'co-breadcrumb') {
        parent = parent.$parent;
      }

      return parent;
    },
    separator() {
      if (this.breadcrumb && this.breadcrumb.separator) {
        return this.breadcrumb.separator;
      }

      return '';
    },
  },
  mounted() {
    this.showSlot = typeof this.$slots.separator !== 'undefined';
  },
  methods: {
    onClick() {
      const { to, replace } = this;

      if (this.$router) {
        replace ? this.$router.replace(to) : this.$router.push(to);
      } else {
        window.location.href = to;
      }
    },
  },
};
</script>
