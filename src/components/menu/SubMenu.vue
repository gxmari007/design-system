<script>
import CoCollapseTransition from 'components/collapse-transition';
import SubMenuPopper from './SubMenuPopper';
import mixin from './mixin';

export default {
  name: 'CoSubMenu',
  components: {
    CoCollapseTransition,
    SubMenuPopper,
  },
  mixins: [mixin],
  inject: ['rootMenu'],
  props: {
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false,
    },
    // 唯一标志
    name: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      timeoutID: null,
      selectedChilds: [], // 选中的 menu-item 组件
    };
  },
  computed: {
    classes() {
      const {
        mode,
        disabled,
        visible,
        selectedChilds,
      } = this;
      const prefixClass = 'co-menu__submenu';

      return [prefixClass, `${prefixClass}--${mode}`, {
        [`${prefixClass}--disabled`]: disabled,
        [`${prefixClass}--open`]: visible,
        [`${prefixClass}--selected`]: selectedChilds.length > 0,
      }];
    },
    subClasses() {
      const { mode } = this;
      const prefixClass = 'co-menu';

      return [prefixClass, `${prefixClass}__sub`, `${prefixClass}--${mode}`];
    },
    popperClasses() {
      const prefixClass = 'co-menu';

      return [
        `${prefixClass}__submenu`,
        `${prefixClass}__submenu-popper`,
        `${prefixClass}--${this.theme}`,
      ];
    },
    titleStyles() {
      const styles = {};

      if (this.mode === 'inline') {
        styles.paddingLeft = `${this.indent}px`;
      }

      return styles;
    },
    // 子组件的 indent 值
    subIndent() {
      return this.indent + this.rootMenu.inlineIndent;
    },
    // submenu 的显示和隐藏状态
    visible() {
      return this.rootMenu.openSubMenus.indexOf(this.name) > -1;
    },
    // menu 的主题颜色
    theme() {
      return this.rootMenu.theme;
    },
    // 判断是否为 menu 组件中的根 submenu
    // popper 中的子 submenu 不需要插入到 body 底部
    isRootSubMenu() {
      let parent = this.$parent;
      let result = true;

      while (parent) {
        const { name } = parent.$options;

        if (name === 'CoSubMenu') {
          result = false;
          break;
        }

        if (name === 'CoMenu') {
          break;
        }

        parent = parent.$parent;
      }

      return result;
    },
  },
  created() {
    // 监听子组件是否被选中，添加 selected 类
    this.$on('menu-item-selected', this.onMenuItemSelected);
  },
  methods: {
    onMenuItemSelected(name, selected) {
      const index = this.selectedChilds.indexOf(name);

      if (selected && index === -1) {
        this.selectedChilds.push(name);
      } else if (!selected && index > -1) {
        this.selectedChilds.splice(index, 1);
      }
    },
    // inline 模式下 click 事件方法
    onClick() {
      if (this.disabled || this.mode !== 'inline') return;

      this.rootMenu.updateOpenSubNames('click', this.name);
    },
    /**
     * 非 inline 模式下 hover 事件方法
     * @param {String} state 代表移入或移出的状态
     */
    onHover(state) {
      if (this.disabled || this.mode === 'inline') return;
      if (this.timeoutID) {
        clearTimeout(this.timeoutID);
      }

      const timeout = state === 'enter'
        ? this.rootMenu.subMenuOpenDelay
        : this.rootMenu.subMenuCloseDelay;

      this.timeoutID = setTimeout(() => {
        this.rootMenu.updateOpenSubNames('hover', this.name, state);
      }, timeout);
    },
    // 渲染 sub menu title
    renderTitle() {
      return (
        <div
          class="co-menu__submenu-title"
          style={this.titleStyles}
          onClick={this.onClick}
          onMouseenter={() => this.onHover('enter')}
          onMouseleave={() => this.onHover('leave')}>
          {this.$slots.title}
          <i class="co-menu__submenu-arrow"></i>
        </div>
      );
    },
    renderPopper() {
      let placement = 'bottom';
      let transformOrigin = 'center bottom';

      // 根据 mode 的类型设置 popper 弹出的位置
      if (['vertical', 'vertical-left', 'vertical-right'].indexOf(this.mode) > -1) {
        placement = 'right-start';
        transformOrigin = '0 0';
      }

      return (
        <sub-menu-popper
          class={this.popperClasses}
          value={this.visible}
          placement={placement}
          appendToBody={this.isRootSubMenu}
          transformOrigin={transformOrigin}
          nativeOnMouseenter={() => this.onHover('enter')}
          nativeOnMouseleave={() => this.onHover('leave')}>
          <ul class={this.subClasses}>{this.$slots.default}</ul>
        </sub-menu-popper>
      );
    },
    // 渲染 sub menu list
    renderSubList() {
      // 只有 inline 模式为展开类型
      if (this.mode === 'inline') {
        return (
          <co-collapse-transition>
            <ul
              class={this.subClasses}
              v-show={this.visible}>
              {this.$slots.default}
            </ul>
          </co-collapse-transition>
        );
      }

      // 其他模式为 popper 窗口
      return this.renderPopper();
    },
  },
  render() {
    return (
      <li class={this.classes}>
        {this.renderTitle()}
        {this.renderSubList()}
      </li>
    );
  },
};
</script>
