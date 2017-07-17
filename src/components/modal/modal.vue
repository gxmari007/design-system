<template>
  <span>
    <transition name="co-fade">
      <div v-show="visible" class="co-modal__mask" @click="clickMask"></div>
    </transition>
    <transition name="co-modal__fade">
      <div v-show="visible" :class="classes" @click.self="clickMask">
        <div class="co-modal__main" :style="contentStyles">
          <div v-if="title || $slots.header" class="co-modal__header">
            <slot name="header">
              <h3 class="co-modal__title">{{ title }}</h3>
            </slot>
            <co-icon class="co-modal__close" type="ios-close-empty" @click.native="onCancel"></co-icon>
          </div>
          <div class="co-modal__body">
            <slot></slot>
          </div>
          <div class="co-modal__footer">
            <slot name="footer">
              <co-button type="ghost" @click.native="onCancel">{{ cancelText }}</co-button>
              <co-button type="primary" @click.native="onOk">{{ okText }}</co-button>
            </slot>
          </div>
        </div>
      </div>
    </transition>
  </span>
</template>

<script>
// components
import { CoButton } from 'components/button';
import CoIcon from 'components/icon';
// libs
import listen from 'dom-helpers/events/listen';
import { getScrollBarWidth } from 'utils/help';

const prefixClass = 'co-modal';

export default {
  name: 'co-dialog',
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
    // 确定按钮的文本
    okText: {
      type: String,
      default: '确定',
    },
    // 取消按钮的文本
    cancelText: {
      type: String,
      default: '取消',
    },
    // 点击遮罩是否可以关闭模态框
    maskCloseable: {
      type: Boolean,
      default: true,
    },
    // 打开模态框的时候背景页面是否可以滚动
    scrollable: {
      type: Boolean,
      default: false,
    },
    // 模态框是否居中显示
    center: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // keydown unbind function
      keydownOff: null,
      // body 标签是否有滚动条
      bodyOverflow: false,
      // 滚动条的宽度
      scrollBarWidth: 0,
    };
  },
  computed: {
    classes() {
      return {
        [prefixClass]: true,
        [`${prefixClass}--center`]: this.center,
      };
    },
    visible: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      },
    },
    contentStyles() {
      return {
        width: `${this.width}px`,
      };
    },
  },
  watch: {
    visible(val) {
      if (val) {
        if (!this.scrollable) {
          this.addScrollEffect();
        }
      } else {
        this.removeScrollEffect();
      }
    },
  },
  methods: {
    close() {
      this.$emit('input', false);
    },
    onOk() {
      this.close();
      this.$emit('on-ok');
    },
    onCancel() {
      this.close();
      this.$emit('on-cancel');
    },
    clickMask() {
      if (this.maskCloseable) {
        this.onCancel();
      }
    },
    onEscClose(e) {
      if (this.value && e.keyCode === 27) {
        this.onCancel();
      }
    },
    addScrollEffect() {
      this.bodyOverflow = window.innerWidth > document.body.clientWidth;

      if (this.bodyOverflow) {
        this.scrollBarWidth = getScrollBarWidth();
      }

      if (this.bodyOverflow && this.scrollBarWidth > 0) {
        document.body.style.paddingRight = `${this.scrollBarWidth}px`;
      }

      document.body.style.overflow = 'hidden';
    },
    removeScrollEffect() {
      setTimeout(() => {
        const bodyStyle = document.body.style;

        bodyStyle.paddingRight = '';
        bodyStyle.overflow = '';
      }, 200);
    },
  },
  mounted() {
    this.keydownOff = listen(document, 'keydown', this.onEscClose);
  },
  beforeDestroy() {
    if (typeof this.keydownOff === 'function') {
      this.keydownOff();
    }
  },
  components: {
    CoButton,
    CoIcon,
  },
};
</script>
