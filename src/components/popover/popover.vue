<template>
  <div
    class="co-popover"
    @mouseenter="onMouseenter"
    @mouseleave="onMouseleave"
    v-clickoutside="hide">
    <div
      class="co-popover__reference"
      ref="reference"
      @click="onClick">
      <slot></slot>
    </div>
    <transition :name="transition">
      <div
        v-show="visible"
        class="co-popover__popper"
        :style="styles"
        ref="popper"
        @mouseenter="onMouseenter"
        @mouseleave="onMouseleave">
        <div class="co-popover__arrow"></div>
        <div class="co-popover__inner">
          <div v-if="$slots.title || title" class="co-popover__title">
            <slot name="title" class="co-popover__title">{{ title }}</slot>
          </div>
          <div v-if="$slots.content || content" class="co-popover__content">
            <slot name="content">{{ content }}</slot>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
// utils
import { oneOf } from 'utils/help';
// mixins
import popper from 'mixins/popper';
// directives
import clickoutside from 'directives/clickoutside';
// libs
import listen from 'dom-helpers/events/listen';

export default {
  name: 'co-popover',
  mixins: [popper],
  directives: { clickoutside },
  props: {
    trigger: {
      type: String,
      default: 'click',
      validator(value) {
        return oneOf(value, ['click', 'hover', 'focus']);
      },
    },
    // popover 标题，也可以定义 slot="title"
    title: {
      type: String,
      default: '',
    },
    // popover 提示内容，也可以定义 slot="content"
    content: {
      type: String,
      default: '',
    },
    // 设置 popover 的宽度
    width: [String, Number],
    // popover 是否可用
    disabled: {
      type: Boolean,
      default: false,
    },
    transition: {
      type: String,
      default: 'co-scale',
    },
  },
  data() {
    return {
      timeoutID: null,
      focusOff: null,
      blurOff: null,
    };
  },
  watch: {
    visible(newVal) {
      if (newVal) {
        this.$emit('on-show');
      } else {
        this.$emit('on-hide');
      }
    },
  },
  computed: {
    styles() {
      const style = {};

      if (typeof this.width !== 'undefined') {
        style.width = `${this.width}px`;
      }

      return style;
    },
  },
  mounted() {
    if (this.trigger === 'focus') {
      let elm = this.findInput();

      if (!elm) {
        elm = this.$slots.default[0].elm;
      }

      this.focusOff = listen(elm, 'focus', this.show);
      this.blurOff = listen(elm, 'blur', this.hide);
    }
  },
  beforeDestroy() {
    if (this.timeoutID) {
      clearTimeout(this.timeoutID);
    }
    if (this.focusOff) {
      this.focusOff();
    }
    if (this.blurOff) {
      this.blurOff();
    }
  },
  methods: {
    show() {
      this.visible = true;
    },
    hide() {
      this.visible = false;
    },
    onMouseenter() {
      if (this.disabled || this.trigger !== 'hover') return;

      if (this.timeoutID) {
        clearTimeout(this.timeoutID);
      }

      this.timeoutID = setTimeout(this.show, 0);
    },
    onMouseleave() {
      if (this.disabled || this.trigger !== 'hover') return;

      if (this.timeoutID) {
        clearTimeout(this.timeoutID);
      }

      this.timeoutID = setTimeout(this.hide, 100);
    },
    onClick() {
      if (this.disabled || this.trigger !== 'click') return;

      this.visible = !this.visible;
    },
  },
};
</script>
