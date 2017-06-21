<template>
  <li class="co-tree__item">
    <span :class="arrowClasses" @click="toggle">
      <co-icon v-if="isFolder" class="co-tree__arrow" type="arrow-right-b"></co-icon>
    </span>
    <span class="co-tree__label">{{ data.label }}</span>
    <co-collapse-transition>
      <div v-if="isFolder" v-show="visible" class="co-tree__sub-tree">
        <ul class="co-tree">
          <co-tree-item
            v-for="(item, index) in data.children"
            :key="index"
            :data="item"></co-tree-item>
        </ul>
      </div>
    </co-collapse-transition>
  </li>
</template>

<script>
import CoIcon from 'components/icon';
import CoCollapseTransition from 'components/collapse/collapse-transition';

export default {
  name: 'co-tree-item',
  props: {
    data: Object,
  },
  data() {
    return {
      visible: false,
    };
  },
  computed: {
    arrowClasses() {
      const prefixClass = 'co-tree__arrow';

      return {
        [`${prefixClass}`]: true,
        [`${prefixClass}--none`]: !this.isFolder,
        [`${prefixClass}--open`]: this.visible,
      };
    },
    isFolder() {
      return this.data.children && this.data.children.length > 0;
    },
  },
  methods: {
    toggle() {
      if (this.isFolder) {
        this.visible = !this.visible;
      }
    },
  },
  components: {
    CoIcon,
    CoCollapseTransition,
  },
};
</script>
