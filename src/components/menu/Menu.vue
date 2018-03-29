<template>
  <ul :class="classes">
    <slot />
  </ul>
</template>

<script>
import { oneOf } from 'utils/help';

export default {
  name: 'CoMenu',
  provide() {
    return {
      rootMenu: this,
    };
  },
  props: {
    // 初始展开的 SubMenu 菜单项 name 数组
    defaultOpenNames: {
      type: Array,
      default: () => [],
    },
    // 初始选中的菜单项 name 数组
    defaultSelectedNames: {
      type: Array,
      default: () => [],
    },
    // inline 模式的菜单缩进宽度
    inlineIndent: {
      type: Number,
      default: 24,
    },
    // 菜单类型，现在支持垂直、水平、和内嵌模式三种
    mode: {
      type: String,
      default: 'vertical',
      validator(value) {
        return oneOf(value, ['vertical', 'vertical-right', 'vertical-left', 'horizontal', 'inline']);
      },
    },
    // 是否允许多选
    multiple: {
      type: Boolean,
      default: false,
    },
    // 当前展开的 SubMenu 菜单项 name 数组
    openNames: {
      type: Array,
      default: () => [],
    },
    // 是否允许选中
    selectable: {
      type: Boolean,
      default: true,
    },
    // 当前选中的菜单项 name 数组
    selectedNames: {
      type: Array,
      default: () => [],
    },
    // 用户鼠标离开子菜单后关闭延时，单位：秒
    subMenuCloseDelay: {
      type: Number,
      default: 0.1,
    },
    // 用户鼠标进入子菜单后开启延时，单位：秒
    subMenuOpenDelay: {
      type: Number,
      default: 0,
    },
    // 主题颜色
    theme: {
      type: String,
      default: 'light',
      validator(value) {
        return oneOf(value, ['light', 'dark']);
      },
    },
  },
  data() {
    const {
      defaultSelectedNames,
      selectedNames,
      defaultOpenNames,
      openNames,
    } = this;

    return {
      // 选择的 menu-item 组件 name 数组
      selectedItems: this.getInitParam(defaultSelectedNames, selectedNames),
      // 展开的 sub-menu 组件 name 数组
      openSubMenus: this.getInitParam(defaultOpenNames, openNames),
      timeoutID: null,
    };
  },
  computed: {
    classes() {
      const { theme, mode } = this;
      const prefixClass = 'co-menu';

      return [prefixClass, `${prefixClass}--root`, `${prefixClass}--${theme}`, `${prefixClass}--${mode}`];
    },
  },
  watch: {
    selectedNames(newVal) {
      this.selectedItems = newVal;
    },
    openNames(newVal) {
      this.openSubMenus = newVal;
    },
  },
  methods: {
    /**
     * 控制 menu-item 组件的选择
     * @param {String} name
     * @param {String} namePath
     * @param {Boolean} selected
     */
    updateSelectItems(name, namePath, selected) {
      const { multiple, selectable } = this;

      if (selectable) {
        if (multiple) {
          const index = this.selectedItems.indexOf(name);

          if (index > -1) {
            this.selectedItems.splice(index, 1);
            this.$emit('on-deselect', {
              name,
              selectedNames: this.selectedItems,
            });
          } else {
            this.selectedItems.push(name);
            this.$emit('on-select', {
              name,
              selectedNames: this.selectedItems,
            });
          }
        } else if (!selected) {
          this.selectedItems = [name];
          this.$emit('on-select', {
            name,
            selectedNames: this.selectedItems,
          });
        }

        this.$emit('on-click', {
          name,
          namePath,
        });
      }
    },
    /**
     * 控制 sub-menu 组件展开或收起
     * @param {String} type 事件类型
     * @param {String} name sub-menu 组件的 name 值
     * @param {String} state 事件移入移出状态
     */
    updateOpenSubNames(type, name, state) {
      const index = this.openSubMenus.indexOf(name);

      if (type === 'click' && this.mode === 'inline') {
        if (index > -1) {
          this.openSubMenus.splice(index, 1);
        } else {
          this.openSubMenus.push(name);
        }
      } else if (type === 'hover' && this.mode !== 'inline') {
        if (this.timeoutID) {
          clearTimeout(this.timeoutID);
        }

        if (state === 'enter' && index === -1) {
          this.timeoutID = setTimeout(() => {
            this.openSubMenus.push(name);
          }, this.subMenuOpenDelay * 1000);
        } else if (state === 'leave' && index > -1) {
          this.timeoutID = setTimeout(() => {
            this.openSubMenus.splice(index, 1);
          }, this.subMenuCloseDelay * 1000);
        }
      }
    },
    /**
     * 根据传入的参数判断应该返回什么样的初始值
     * @param {Array} defaultParam prop 传入的初始化默认参数
     * @param {Array} param prop 传入的参数
     * @returns {Boolean}
     */
    getInitParam(defaultParam = [], param = []) {
      return param.length > 0 ? param : defaultParam;
    },
  },
};
</script>
