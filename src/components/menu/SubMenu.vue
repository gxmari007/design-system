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

      return [`${prefixClass}`, `${prefixClass}__sub`, `${prefixClass}--${mode}`];
    },
    titleStyles() {
      return {
        paddingLeft: `${this.indent}px`,
      };
    },
    mode() {
      return this.rootMenu.mode;
    },
    // 子组件的 indent 值
    subIndent() {
      return this.indent + this.rootMenu.inlineIndent;
    },
    visible() {
      return this.rootMenu.openSubMenus.indexOf(this.name) > -1;
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
      const { titleStyles, toggleSubState } = this;

      return (
        <div
          class="co-menu__submenu-title"
          style={titleStyles}
          onClick={() => toggleSubState('click')}
          onMouseenter={() => toggleSubState('hover', 'enter')}
          onMouseleave={() => toggleSubState('hover', 'leave')}>
          {this.$slots.title}
          <i class="co-menu__submenu-arrow"></i>
        </div>
      );
    },
    // 渲染 sub menu list
    renderList() {
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

      return (
        <sub-menu-popper
          class={this.subClasses}
          value={this.visible}
          placement="right-start"
          onInput={this.onInput}>
          {this.$slots.default}
        </sub-menu-popper>
      );
    },
  },
  render() {
    return (
      <li class={this.classes}>
        {this.renderTitle()}
        {this.renderList()}
      </li>
    );
  },
};
</script>
