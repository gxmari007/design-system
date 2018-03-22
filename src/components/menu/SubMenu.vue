<template>
  <li :class="classes">
    <div
      class="co-menu__submenu-title"
      :style="titleStyles"
      @click="toggleSubState('click')"
      @mouseenter="toggleSubState('hover', 'enter')"
      @mouseleave="toggleSubState('hover', 'leave')">
      <slot name="title" />
      <i class="co-menu__submenu-arrow"></i>
    </div>
    <co-collapse-transition>
      <ul :class="subClasses" v-show="visible">
        <slot />
      </ul>
    </co-collapse-transition>
  </li>
</template>

<script>
import CoCollapseTransition from 'components/collapse-transition';
import mixin from './mixin';

export default {
  name: 'CoSubMenu',
  components: {
    CoCollapseTransition,
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
      visible: false,
    };
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
  },
  methods: {
    // title 的 click 和 hover 事件回掉，切换 sub 的显示或隐藏
    toggleSubState(type, state) {
      if (this.disabled) return;

      if (type === 'click' && this.mode === 'inline') {
        this.visible = !this.visible;
      } else if (type === 'hover' && this.mode !== 'inline') {
        this.visible = state === 'enter';
      }
    },
  },
};
</script>
