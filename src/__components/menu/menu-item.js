import emitter from 'mixins/emitter';

export default {
  name: 'co-menu-item',
  mixins: [emitter],
  props: {
    name: {
      type: [String, Number],
      required: true,
    },
  },
  computed: {
    classes() {
      return ['co-menu__item', {
        active: this.active,
      }];
    },
    menu() {
      let parent = this.$parent;

      while (parent && parent.$options.name !== 'co-menu') {
        parent = parent.$parent;
      }

      return parent;
    },
    submenu() {
      let parent = this.$parent;

      while (parent && parent.$options.name !== 'co-submenu') {
        parent = parent.$parent;
      }

      return parent;
    },
    active() {
      return this.menu ? this.menu.active === this.name : false;
    },
    router() {
      return this.menu ? this.menu.router : false;
    },
  },
  created() {
    if (this.submenu) {
      this.submenu.items.push(this);
    }
  },
  beforeDestroy() {
    if (this.submenu) {
      const { items } = this.submenu;

      items.splice(items.indexOf(this), 1);
    }
  },
  methods: {
    onClick() {
      if (this.submenu) {
        this.dispatch('co-submenu', 'on-menu-item-click');
      }

      this.dispatch('co-menu', 'on-menu-item-click', this.name);
    },
  },
  render() {
    if (this.router) {
      return (
        <router-link class="co-menu__item" to={this.name} tag="li" nativeOnClick={this.onClick}>
          {this.$slots.default}
        </router-link>
      );
    }

    return (
      <li class={this.classes} onClick={this.onClick}>
        {this.$slots.default}
      </li>
    );
  },
};
