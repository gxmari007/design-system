export default {
  computed: {
    // 获取父级组件实例
    // 父级组件包括 menu submenu 组件
    parentVm() {
      let parent = this.$parent;

      while (parent && ['CoMenu', 'CoSubMenu'].indexOf(parent.$options.name) === -1) {
        parent = parent.$parent;
      }

      return parent;
    },
    indent() {
      const { parentVm } = this;
      const { name } = parentVm.$options;

      return name === 'CoMenu' ? parentVm.inlineIndent : parentVm.subIndent;
    },
    mode() {
      return this.rootMenu.mode;
    },
  },
};
