// libs
import listen from 'dom-helpers/events/listen';
// mixins
import popper from 'mixins/popper';
// utils
import { oneOf } from 'utils/help';

export default {
  name: 'co-tooltip',
  mixins: [popper],
  props: {
    trigger: {
      type: String,
      default: 'hover',
      validator(value) {
        return oneOf(value, ['hover', 'click', 'focus']);
      },
    },
    // tooltip 的内容，也可以定义 slot="content"
    content: {
      type: [String, Number],
      default: '',
    },
    // 是否禁用提示
    disabled: {
      type: Boolean,
      default: false,
    },
    // 延迟显示或隐藏提示
    // object 结构 { show: 100, hide: 100 }
    delay: {
      type: [Number, Object],
      default: 0,
    },
    // 是否一直显示提示
    always: {
      type: Boolean,
      default: false,
    },
    // 开启或禁用动画
    animation: {
      type: Boolean,
      default: true,
    },
    // 定义渐变动画
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
    always: {
      immediate: true,
      handler(newVal) {
        if (newVal && newVal !== this.visible) {
          this.visible = newVal;
        }
      },
    }
  },
  mounted() {
    if (this.trigger === 'focus') {
      const elm = this.findInput();

      if (elm) {
        this.focusOff = listen(elm, 'focus', this.onFocus);
        this.blurOff = listen(elm, 'blur', this.onBlur);
      }
    }
  },
  beforeDestroy() {
    if (this.timeoutID) {
      clearTimeout(this.timeoutID);
    }

    if (this.focusOff) this.focusOff();
    if (this.blurOff) this.blurOff();
  },
  methods: {
    // 触发提示框显示
    triggerOn() {
      if (this.timeoutID) {
        clearTimeout(this.timeoutID);
      }

      let delay = 0;

      if (typeof this.delay === 'number') {
        delay = this.delay;
      } else if (typeof this.delay === 'object') {
        delay = this.delay.show;
      }

      this.timeoutID = setTimeout(() => {
        this.visible = true;
      }, delay);
    },
    // 触发提示框关闭
    triggerOff() {
      if (this.timeoutID) {
        clearTimeout(this.timeoutID);
      }

      if (typeof this.delay === 'object') {
        this.timeoutID = setTimeout(() => {
          this.visible = false;
        }, this.delay.hide);
      } else {
        this.visible = false;
      }
    },
    onFocus() {
      if (this.disabled || this.trigger !== 'focus') return;

      this.triggerOn();
    },
    onBlur() {
      if (this.disabled || this.trigger !== 'focus') return;

      this.triggerOff();
    },
    onMouseenter() {
      if (this.disabled || this.trigger !== 'hover') return;

      this.triggerOn();
    },
    onMouseleave() {
      if (this.disabled || this.trigger !== 'hover') return;

      this.triggerOff();
    },
    onClick() {
      if (this.disabled || this.trigger !== 'click') return;

      if (this.timeoutID) {
        clearTimeout(this.timeoutID);
      }

      let delay = 0;

      // 点击操作需要考虑提示框是否显示
      // 根据 delay 参数判断一下 visible 的真假
      if (this.visible) {
        if (typeof this.delay === 'object') {
          delay = this.delay.hide;
        }

        this.timeoutID = setTimeout(() => {
          this.visible = false;
        }, delay);
      } else {
        let delay = typeof this.delay === 'object' ? this.delay.show : this.delay;

        this.timeoutID = setTimeout(() => {
          this.visible = true;
        }, delay);
      }
    },
    findInput() {
      const reference = this.$refs.reference;
      const inputElm = reference.querySelector('input');
      const textareaElm = reference.querySelector('textarea');
      let elm = null;

      if (inputElm) {
        elm = inputElm
      } else if (textareaElm) {
        elm = textareaElm;
      }

      return elm;
    },
    renderPopper() {
      return (
        <div v-show={this.visible || this.always} class="co-tooltip__popper" ref="popper">
          <div class="co-tooltip__arrow"></div>
          <div class="co-tooltip__content">
            {this.$slots.content ? this.$slots.content : this.content}
          </div>
        </div>
      );
    },
  },
  render() {
    let popper = (
      <transition name={this.transition}>
        {this.renderPopper()}
      </transition>
    );

    if (!this.animation) {
      popper = this.renderPopper();
    }

    return (
      <div
        class="co-tooltip"
        onMouseenter={this.onMouseenter}
        onMouseleave={this.onMouseleave}>
        <div
          class="co-tooltip__reference"
          ref="reference"
          onClick={this.onClick}
          onMousedown={this.onFocus}
          onMouseup={this.onBlur}>
          {this.$slots.default}
        </div>
        {popper}
      </div>
    );
  },
};
