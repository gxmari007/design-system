<template>
  <li class="co-tree__item">
    <span :class="arrowClasses" @click="toggle">
      <co-icon v-if="isFolder" class="co-tree__arrow" type="arrow-right-b"></co-icon>
    </span>
    <co-checkbox
      v-if="tree.checkable"
      class="co-tree__check"
      :value="checked"
      :indeterminate="indeterminate"
      @input="onInput"></co-checkbox>
    <span class="co-tree__label">{{ data.label }}</span>
    <co-collapse-transition>
      <div v-if="isFolder" v-show="visible" class="co-tree__sub-tree" :style="subTreeStyles">
        <ul class="co-tree">
          <co-tree-item
            ref="childs"
            v-for="(item, index) in data.children"
            :key="index"
            :data="item"
            @on-checked="onChecked"></co-tree-item>
        </ul>
      </div>
    </co-collapse-transition>
  </li>
</template>

<script>
import CoIcon from 'components/icon';
import { CoCheckbox } from 'components/checkbox';
import CoCollapseTransition from 'components/collapse/collapse-transition';
import emitter from 'mixins/emitter';

export default {
  name: 'co-tree-item',
  mixins: [emitter],
  props: {
    data: Object,
  },
  data() {
    return {
      visible: false,
      checked: false,
      childs: [],
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
    subTreeStyles() {
      return {
        marginLeft: `${this.tree.indent}px`,
      };
    },
    tree() {
      let parent = this.$parent;

      while (parent && parent.$options.name !== 'co-tree') {
        parent = parent.$parent;
      }

      return parent;
    },
    isFolder() {
      return this.data.children && this.data.children.length > 0;
    },
    isSubItem() {
      return this.$parent.$options.name === 'co-tree-item';
    },
    indeterminate() {
      if (this.childs.every(child => !child.checked && !child.indeterminate)) {
        return false;
      }

      return this.childs.some(child => !child.checked || child.indeterminate);
    },
  },
  watch: {
    checked() {
      if (this.isSubItem) {
        this.$emit('on-checked');
      }
    },
  },
  created() {
    if (this.isSubItem) {
      this.$on('parent-checked-change', this.onParentCheckedChange);
    }
  },
  mounted() {
    this.childrenChange();
  },
  methods: {
    toggle() {
      if (this.isFolder) {
        this.visible = !this.visible;
      }
    },
    childrenChange() {
      if (this.isFolder) {
        this.childs = this.$refs.childs.map(child => child);
      }
    },
    onChecked() {
      this.checked = this.childs.every(child => child.checked);
    },
    onInput(value) {
      if (this.checked === value) return;

      this.checked = value;

      if (this.isFolder) {
        this.broadcast('co-tree-item', 'parent-checked-change', value);
      }
    },
    onParentCheckedChange(checked) {
      this.checked = checked;
    },
  },
  components: {
    CoIcon,
    CoCheckbox,
    CoCollapseTransition,
  },
};
</script>
