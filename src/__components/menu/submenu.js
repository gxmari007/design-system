import CoIcon from 'components/icon';
import CoCollapseTransition from 'components/collapse/collapse-transition';
import popper from 'mixins/popper';

export default {
  name: 'co-submenu',
  mixins: [popper],
  props: {
    name: {
      type: [String, Number],
      required: true,
    },
    title: String,
  },
  data() {
    return {
      width: 0,
      hover: false,
      open: false,
      timeoutID: null,
      items: [],
    };
  },
  computed: {
    menu() {
      let parent = this.$parent;

      while (parent && parent.$options.name !== 'co-menu') {
        parent = parent.$parent;
      }

      return parent;
    },
    mode() {
      return this.menu ? this.menu.mode : '';
    },
    openNames() {
      return this.menu ? this.menu.openNames : [];
    },
    dropdownStyles() {
      const styles = {};

      if (this.width) {
        styles.minWidth = `${this.width}px`;
      }

      return styles;
    },
    titleClasses() {
      return ['co-menu__submenu-title', {
        active: this.hover || this.active,
      }];
    },
    iconClasses() {
      return ['co-menu__submenu-icon', {
        open: this.hover || this.open,
      }];
    },
    active() {
      return this.items.some(item => item.active);
    },
  },
  watch: {
    openNames: {
      immediate: true,
      handler(newVal) {
        this.open = newVal.indexOf(this.name) !== -1;
      },
    },
  },
  mounted() {
    if (this.mode === 'horizontal') {
      this.width = this.$refs.reference.clientWidth;
    }

    this.$on('on-menu-item-click', this.onMenuItemClick);
  },
  beforeDestroy() {
    this.clearTimer();
  },
  methods: {
    clearTimer() {
      if (this.timeoutID) {
        clearTimeout(this.timeoutID);
      }
    },
    onMouseenter() {
      this.clearTimer();

      this.timeoutID = setTimeout(() => {
        this.hover = true;
        this.visible = true;
      }, 150);
    },
    onMouseleave() {
      this.clearTimer();

      this.timeoutID = setTimeout(() => {
        this.hover = false;
        this.visible = false;
      }, 150);
    },
    onMenuItemClick() {
      this.hover = false;
      this.visible = false;
    },
    openChange() {
      this.open = !this.open;
    },
    renderTitle() {
      if (this.mode === 'horizontal') {
        return (
          <div
            class={this.titleClasses}
            ref="reference"
            onMouseenter={this.onMouseenter}
            onMouseleave={this.onMouseleave}>
            {this.$slots.title || this.title}
            <co-icon class={this.iconClasses} type="ios-arrow-down"></co-icon>
          </div>
        );
      }

      return (
        <div class={this.titleClasses} onClick={this.openChange}>
          {this.$slots.title || this.title}
          <co-icon class={this.iconClasses} type="ios-arrow-down"></co-icon>
        </div>
      );
    },
    renderMenu() {
      if (this.mode === 'horizontal') {
        return (
          <transition name="co-slide">
            <ul
              v-show={this.visible}
              ref="popper"
              class="co-menu__dropdown"
              style={this.dropdownStyles}
              onMouseenter={this.onMouseenter}
              onMouseleave={this.onMouseleave}>
              {this.$slots.default}
            </ul>
          </transition>
        );
      }

      return (
        <co-collapse-transition>
          <ul class="co-menu" v-show={this.open}>
            {this.$slots.default}
          </ul>
        </co-collapse-transition>
      );
    },
  },
  render() {
    return (
      <li class="co-menu__submenu">
        {this.renderTitle()}
        {this.renderMenu()}
      </li>
    );
  },
  components: {
    CoIcon,
    CoCollapseTransition,
  },
};
