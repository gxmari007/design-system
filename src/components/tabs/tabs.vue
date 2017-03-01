<template>
  <div class="co-tabs">
    <ul class="co-tabs__navs">
      <li
        class="co-tabs__nav-item"
        :class="{ active: tab.key === active }"
        v-for="tab in tabs"
        @click="onClick(tab)">{{ tab.label }}</li>
    </ul>
    <div class="co-tabs__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'co-tabs',
  props: {
    // 当前激活的 tab-pane 的别名
    activeName: {
      type: [String, Number],
      default: 0,
    },
  },
  data() {
    return {
      active: this.activeName,
      // tab-pane 组件实例数组
      tabs: [],
    };
  },
  methods: {
    onClick(tab) {
      if (!tab.disabled) {
        this.active = tab.key;
      }
    },
  },
};
</script>
