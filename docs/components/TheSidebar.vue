<script>
import cn from '~/locales/cn.json';

export default {
  name: 'TheSidebar',
  data() {
    return {
      menus: cn.sidebar,
    };
  },
  methods: {
    renderChilds: function renderChilds(h, list) {
      return list.map((item) => {
        if (item.type === 'submenu') {
          return (
            <co-sub-menu name={item.key}>
              <h4 slot="title">{item.name}</h4>
              {renderChilds(h, item.childs)}
            </co-sub-menu>
          );
        } else if (item.type === 'group') {
          return (
            <co-item-group>
              <template slot="title">{item.name}</template>
              {renderChilds(h, item.childs)}
            </co-item-group>
          );
        }

        return (
          <co-menu-item name={item.path}>
            <nuxt-link to={item.path}>{item.name}</nuxt-link>
          </co-menu-item>
        );
      });
    },
  },
  render(h) {
    return (
      <co-menu
        class="aside-container"
        mode="inline"
        default-open-names={['components']}
        selected-names={[this.$route.path]}
        inline-indent={40}>
        {this.renderChilds(h, this.menus)}
      </co-menu>
    );
  },
};
</script>

<style lang="less">
.aside-container {
  &.co-menu--inline .co-menu__item-group-title {
    padding-left: 56px;
  }

  .co-menu__item > a {
    color: #314659;
  }
}
</style>
