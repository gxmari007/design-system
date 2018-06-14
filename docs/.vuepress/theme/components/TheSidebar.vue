<script>
export default {
  name: 'TheSidebar',
  computed: {
    sidebar() {
      return this.$site.themeConfig.sidebar;
    },
    defaultOpenNames() {
      return this.getDefaultOpenNames(this.sidebar);
    },
    selectedNames() {
      return [this.$route.path];
    },
  },
  methods: {
    getDefaultOpenNames: function getDefaultOpenNames(sidebar = []) {
      const result = [];

      sidebar.forEach((item) => {
        if (item.hasOwnProperty('open')) {
          result.push(item.text);
        }

        if (item.hasOwnProperty('children')) {
          result.push(...getDefaultOpenNames(item.children));
        }
      });

      return result;
    },
    renderSidebar: function renderSidebar(h, sidebar = [], instance) {
      return sidebar.map((item) => {
        if (item.hasOwnProperty('open')) {
          return (
            <co-sub-menu name={item.text}>
              <h4 slot="title">{item.text}</h4>
              {renderSidebar(h, item.children, instance)}
            </co-sub-menu>
          );
        } else if (item.hasOwnProperty('children')) {
          return (
            <co-item-group>
              <template slot="title">{item.text}</template>
              {renderSidebar(h, item.children, instance)}
            </co-item-group>
          );
        }

        return (
          <co-menu-item name={item.link}>
            <router-link to={item.link}>
              <span>{item.text}</span>
              {item.chinese &&
              <span class="sidebar__chinese">{item.chinese}</span>}
            </router-link>
          </co-menu-item>
        );
      });
    },
  },
  render(h) {
    return (
      <co-menu
        class="sidebar docs-menu"
        mode="inline"
        default-open-names={this.defaultOpenNames}
        selected-names={this.selectedNames}
        inline-indent={40}>
        {this.renderSidebar(h, this.sidebar, this)}
      </co-menu>
    );
  },
};
</script>

<style lang="less">
.sidebar {
  &.co-menu--inline {
    padding-bottom: 50px;

    & > .co-menu__item {
      font-size: 14px;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .co-menu__item-group-title {
      padding-left: 56px !important;
    }
  }

  &__chinese {
    font-size: 12px;
    font-weight: 400;
    margin-left: 6px;
    opacity: .67;
  }
}
</style>
