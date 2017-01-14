<template>
  <span class="co-breadcrumb__item">
    <a class="co-breadcrumb__text" v-if="href" :href="href">
      <slot></slot>
    </a>
    <span class="co-breadcrumb__text" v-else ref="text">
      <slot></slot>
    </span>
    <span class="co-breadcrumb__separator" v-html="separator"></span>
  </span>
</template>

<script>
import listen from 'dom-helpers/events/listen';

export default {
  name: 'co-breadcrumb-item',
  props: {
    href: String,
    // 配合 vue-router 使用的属性
    // 跳转到的路由
    to: [String, Object],
    // 跳转页面并且不向 history 里添加记录
    replace: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    const separator = this.$parent && this.$parent.$options.componentName === 'co-breadcrumb'
      ? this.$parent.separator
      : '/';

    return { separator };
  },
  mounted() {
    const { to, replace } = this;

    if (to !== undefined) {
      const textDom = this.$refs.text;

      listen(textDom, 'click', () => {
        replace ? this.$router.replace(to) : this.$router.push(to);
      });
    }
  },
};
</script>
