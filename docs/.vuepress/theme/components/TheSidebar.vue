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
              <span slot="title">{item.text}</span>
              {renderSidebar(h, item.children, instance)}
            </co-sub-menu>
          );
        } else if (item.hasOwnProperty('children')) {
          return (
            <co-item-group>
              <span slot="title">{item.text}</span>
              {renderSidebar(h, item.children, instance)}
            </co-item-group>
          );
        }

        return (
          <co-menu-item name={item.text}>
            <router-link to={item.link}>{item.text}</router-link>
          </co-menu-item>
        );
      });
    },
  },
  render(h) {
    return (
      <co-menu class="sidebar" mode="inline" default-open-names={this.defaultOpenNames}>
        {this.renderSidebar(h, this.sidebar, this)}
      </co-menu>
    );
  },
};
</script>

<style lang="less">
.sidebar {
  padding-bottom: 50px;
}
</style>
