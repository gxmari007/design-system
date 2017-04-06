<script>
// mixins
import popper from 'mixins/popper';

export default {
  name: 'co-tooltip',
  mixins: [popper],
  props: {
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
  },
  data() {
    return {
      timeoutID: null,
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
  beforeDestroy() {
    if (this.timeoutID) {
      clearTimeout(this.timeoutID);
    }
  },
  methods: {
    onMouseenter() {
      if (this.disabled) return;

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
    onMouseleave() {
      if (this.disabled) return;

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
      <transition name="co-scale">
        {this.renderPopper()}
      </transition>
    );

    if (!this.animation) {
      popper = this.renderPopper();
    }

    return (
      <div class="co-tooltip" onMouseenter={this.onMouseenter} onMouseleave={this.onMouseleave}>
        <div class="co-tooltip__reference" ref="reference">
          {this.$slots.default}
        </div>
        {popper}
      </div>
    );
  },
};
</script>
