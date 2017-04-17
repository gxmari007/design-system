<template>
  <div class="co-popover">
    <div
      class="co-popover__reference"
      ref="reference"
      @click="onClick"
      @mouseenter="onMouseenter"
      @mouseleave="onMouseleave">
      <slot></slot>
    </div>
    <transition :name="transition">
      <div v-show="visible" class="co-popover__popper" ref="popper">
        <div class="co-popover__arrow"></div>
        <div class="co-popover__inner">
          <div v-if="$slots.title || title" class="co-popover__title">
            <slot name="title">{{ title }}</slot>
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

export default {
  name: 'co-popover',
  mixins: [popper],
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
  methods: {
    onMouseenter() {
      if (this.disabled || this.trigger !== 'hover') return;

      this.visible = true;
    },
    onMouseleave() {
      if (this.disabled || this.trigger !== 'hover') return;

      this.visible = false;
    },
    onClick() {
      if (this.disabled || this.trigger !== 'click') return;

      this.visible = !this.visible;
    },
  },
};
</script>
