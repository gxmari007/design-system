<template>
  <div class="co-collapse__panel">
    <div class="co-collapse__head" @click="onClick">
      <co-icon :class="iconClasses" type="ios-arrow-right"></co-icon>
      <slot name="head"></slot>
    </div>
    <collapse-transition>
      <div v-show="visible" class="co-collapse__body">
        <div class="co-collapse__content">
          <slot></slot>
        </div>
      </div>
    </collapse-transition>
  </div>
</template>

<script>
import CoIcon from 'components/icon';
import CollapseTransition from './collapse-transition';

export default {
  name: 'co-collapse-panel',
  props: {
    name: String,
  },
  computed: {
    parent() {
      let parent = this.$parent;

      while (parent && parent.$options.name !== 'co-collapse') {
        parent = parent.$parent;
      }

      return parent;
    },
    key() {
      return typeof this.name === 'undefined' ?
        this.parent.childs.indexOf(this) :
        this.name;
    },
    visible() {
      return this.parent.actives.indexOf(this.key) > -1;
    },
    iconClasses() {
      const prefixClass = 'co-collapse__icon';

      return {
        [prefixClass]: true,
        [`${prefixClass}--open`]: this.visible,
      };
    },
  },
  mounted() {
    this.parent.slotChange();
  },
  beforeDestroy() {
    this.parent.slotChange();
  },
  methods: {
    onClick() {
      this.parent.expand(this.key);
    },
  },
  components: {
    CoIcon,
    CollapseTransition,
  },
};
</script>
