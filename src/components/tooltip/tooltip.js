// libs
import listen from 'dom-helpers/events/listen';
// mixins
import popper from 'mixins/popper';
// directives
import clickoutside from 'directives/clickoutside';
// utils
import { oneOf } from 'utils/help';

export default {
  name: 'co-tooltip',
  mixins: [popper],
  directives: {
    clickoutside,
  },
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
    },
  },
  mounted() {
    if (this.trigger === 'focus') {
      let elm = this.findInput();

      if (!elm) {
        elm = this.$slots.default[0].elm;
      }

      this.focusOff = listen(elm, 'focus', this.onFocus);
      this.blurOff = listen(elm, 'blur', this.onBlur);
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
    show() {
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
    hide() {
      if (this.timeoutID) {
        clearTimeout(this.timeoutID);
      }

      if (typeof this.delay === 'object') {
        this.timeoutID = setTimeout(() => {
          this.visible = false;
        }, this.delay.hide);
      }

      if (this.trigger === 'hover') {
        // 这里需要给鼠标离开设定一个默认延迟
        // 防止鼠标从 trigger 区域移动到 popper 区域的时候 popper 关闭过快
        this.timeoutID = setTimeout(() => {
          this.visible = false;
        }, 100);
      } else {
        this.visible = false;
      }
    },
    onFocus() {
      if (this.disabled || this.trigger !== 'focus') return;

      this.show();
    },
    onBlur() {
      if (this.disabled || this.trigger !== 'focus') return;

      this.hide();
    },
    onMouseenter() {
      if (this.disabled || this.trigger !== 'hover') return;

      this.show();
    },
    onMouseleave() {
      if (this.disabled || this.trigger !== 'hover') return;

      this.hide();
    },
    onClick() {
      if (this.disabled || this.trigger !== 'click') return;

      if (this.timeoutID) {
        clearTimeout(this.timeoutID);
      }

      let delay = 0;

      // 点击操作需要考虑提示框是否显示
      if (this.visible) {
        if (typeof this.delay === 'object') {
          delay = this.delay.hide;
        }

        this.timeoutID = setTimeout(() => {
          this.visible = false;
        }, delay);
      } else {
        delay = typeof this.delay === 'object' ? this.delay.show : this.delay;

        this.timeoutID = setTimeout(() => {
          this.visible = true;
        }, delay);
      }
    },
    renderPopper() {
      return (
        <div
          v-show={this.visible || this.always}
          class="co-tooltip__popper"
          ref="popper"
          onMouseenter={this.onMouseenter}
          onMouseleave={this.onMouseleave}>
          <div class="co-tooltip__arrow"></div>
          <div class="co-tooltip__content">
            {this.$slots.content ? this.$slots.content : this.content}
          </div>
        </div>
      );
    },
  },
  render() {
    let popperTip = (
      <transition name={this.transition}>
        {this.renderPopper()}
      </transition>
    );

    if (!this.animation) {
      popperTip = this.renderPopper();
    }

    return (
      <div
        class="co-tooltip"
        v-clickoutside={this.hide}
        onMouseenter={this.onMouseenter}
        onMouseleave={this.onMouseleave}>
        <div
          class="co-tooltip__reference"
          ref="reference"
          onClick={this.onClick}>
          {this.$slots.default}
        </div>
        {popperTip}
      </div>
    );
  },
};
