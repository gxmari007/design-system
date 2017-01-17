<template>
  <transition name="co-modal__fade">
    <div class="co-modal" v-show="value">
      <div class="co-modal__mask" @click="clickMask"></div>
      <div class="co-modal__main" :style="contentStyle">
        <div class="co-modal__header" v-if="header">
          <slot name="header">
            <h3 class="co-modal__title">{{ title }}</h3>
          </slot>
        </div>
        <div class="co-modal__body">
          <slot></slot>
        </div>
        <div class="co-modal__footer">
          <slot name="footer" v-if="$slots.footer"></slot>
          <template v-else>
            <button>cancel</button>
            <button>ok</button>
          </template>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import listen from 'dom-helpers/events/listen';

export default {
  name: 'co-modal',
  props: {
    // 控制模态框显示与隐藏
    value: {
      type: Boolean,
      default: false,
    },
    // 模态框的标题
    title: {
      type: String,
      default: '',
    },
    // 模态框的宽度
    width: {
      type: [Number, String],
      default: 420,
    },
    // 点击遮罩是否可以关闭模态框
    maskCloseable: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      off: null,
    };
  },
  computed: {
    header() {
      return this.title || this.$slots.header;
    },
    contentStyle() {
      return {
        width: `${this.width}px`,
      };
    },
  },
  methods: {
    close() {
      this.$emit('input', false);
    },
    clickMask() {
      if (this.maskCloseable) {
        this.close();
      }
    },
    onEscClose(e) {
      if (this.value && e.keyCode === 27) {
        this.close();
      }
    },
  },
  mounted() {
    this.off = listen(document, 'keydown', this.onEscClose);
  },
  beforeDestroy() {
    if (typeof this.off === 'function') {
      this.off();
    }
  },
};
</script>
