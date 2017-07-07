<template>
  <transition name="co-message-fade">
    <div
      v-show="visible"
      :class="classes"
      @mouseenter="clearTimer"
      @mouseleave="startTimer">
      <co-icon
        class="co-message__icon"
        :type="typeIcon"></co-icon><div class="co-message__content">{{ message }}</div>
    </div>
  </transition>
</template>

<script>
import CoIcon from 'components/icon';

const icons = {
  info: 'ios-information',
  success: 'ios-checkmark',
  error: 'ios-close',
  warning: 'ios-information',
};

export default {
  name: 'co-message',
  data() {
    return {
      visible: false,
      type: 'info',
      message: '',
      duration: 3,
      timeoutID: null,
    };
  },
  computed: {
    classes() {
      const prefixClass = 'co-message';

      return [prefixClass, `${prefixClass}--${this.type}`];
    },
    typeIcon() {
      return icons[this.type];
    },
  },
  mounted() {
    this.startTimer();
  },
  methods: {
    close() {
      this.visible = false;
      this.$el.addEventListener('transitionend', this.removeElement);
    },
    removeElement() {
      this.$el.removeEventListener('transitionend', this.removeElement);
      this.$el.parentNode.removeChild(this.$el);
    },
    startTimer() {
      if (this.duration > 0) {
        if (this.timeoutID) {
          clearTimeout(this.timeoutID);
        }

        this.timeoutID = setTimeout(() => {
          if (this.visible) {
            this.close();
          }
        }, this.duration * 1000);
      }
    },
    clearTimer() {
      if (this.timeoutID) {
        clearTimeout(this.timeoutID);
      }
    },
  },
  components: {
    CoIcon,
  },
};
</script>
