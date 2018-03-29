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
  computed: {
    classes() {
      const { mode, disabled, visible } = this;
      const prefixClass = 'co-menu__submenu';

      return [prefixClass, `${prefixClass}--${mode}`, {
        [`${prefixClass}--disabled`]: disabled,
        [`${prefixClass}--open`]: visible,
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
    // popper 中子 submenu 不需要插入到 body 底部
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
  methods: {
    // title 的 click 和 hover 事件回掉，切换 sub 的显示或隐藏
    toggleSubState(type, state) {
      if (this.disabled) return;

      this.rootMenu.updateOpenSubNames(type, this.name, state);
    },
    onInput(value) {
      this.toggleSubState(
        'hover',
        this.name,
        value ? 'enter' : 'leave',
      );
    },
    // 渲染 sub menu title
    renderTitle() {
      return (
        <div
          class="co-menu__submenu-title"
          style={this.titleStyles}
          onClick={() => this.toggleSubState('click')}
          onMouseenter={() => this.toggleSubState('hover', 'enter')}
          onMouseleave={() => this.toggleSubState('hover', 'leave')}>
          {this.$slots.title}
          <i class="co-menu__submenu-arrow"></i>
        </div>
      );
    },
    renderPopper() {
      return (
        <sub-menu-popper
          class={this.popperClasses}
          value={this.visible}
          placement="right-start"
          appendToBody={this.isRootSubMenu}
          onInput={this.onInput}
          nativeOnMouseenter={() => this.toggleSubState('hover', 'enter')}
          nativeOnMouseleave={() => this.toggleSubState('hover', 'leave')}>
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
