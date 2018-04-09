<script>
export default {
  name: 'TheSidebar',
  data() {
    return {
      menus: [
        { type: 'item', key: 'coview', name: 'Ant Design of Vue' },
        {
          type: 'submenu',
          key: 'components',
          name: 'Components',
          childs: [
            {
              type: 'group',
              name: 'General',
              childs: [
                { type: 'item', key: 'button', name: 'Button 按钮' },
                { type: 'item', key: 'icon', name: 'Icon 图标' },
              ],
            },
            {
              type: 'group',
              name: 'Navigation',
              childs: [
                { type: 'item', key: 'menu', name: 'Menu 导航菜单' },
              ],
            },
          ],
        },
      ],
    };
  },
  methods: {
    renderChilds: function renderChilds(h, list) {
      return list.map((item) => {
        if (item.type === 'submenu') {
          return (
            <co-sub-menu name={item.key}>
              <template slot="title">{item.name}</template>
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
          <co-menu-item name={item.key}>{item.name}</co-menu-item>
        );
      });
    },
  },
  render(h) {
    return (
      <co-menu class="aside-container" mode="inline" inline-indent={40}>
        {this.renderChilds(h, this.menus)}
      </co-menu>
    );
  },
};
</script>

<style lang="less">
.aside-container.co-menu--inline .co-menu__item-group-title {
  padding-left: 56px;
}
</style>
