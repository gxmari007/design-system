const webpack = require('webpack');
const pkg = require('../../package.json');

module.exports = {
  base: '/coview/',
  // 配置 head 标签内容
  head: [
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Titillium+Web' }],
  ],
  markdown: {
    anchor: {
      permalinkBefore: false,
    },
  },
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        'process.env.VERSION': JSON.stringify(pkg.version),
      }),
    ],
  },
  themeConfig: {
    nav: [
      { text: '组件', link: '/components/getting-started.html' },
    ],
    sidebar: [
      { text: '快速上手', link: '/components/getting-started.html' },
      { text: '更新日志', link: '/components/changelog.html' },
      {
        text: 'Components',
        open: true,
        children: [
          {
            text: 'General',
            children: [
              { text: 'Button', chinese: '按钮', link: '/components/button.html' },
              { text: 'Icon', chinese: '图标', link: '/components/icon.html' },
            ],
          },
          {
            text: 'Layout',
            children: [
              { text: 'Grid', chinese: '删格', link: '/components/grid.html' },
              { text: 'Layout', chinese: '布局', link: '/components/layout.html' },
            ],
          },
          {
            text: 'Navigation',
            children: [
              { text: 'Affix', chinese: '固钉', link: '/components/affix.html' },
              { text: 'Breadcrumb', chinese: '面包屑', link: '/components/breadcrumb.html' },
              { text: 'Menu', chinese: '导航菜单', link: '/components/menu.html' },
            ],
          },
        ],
      },
    ],
    footer: [
      {
        text: 'CoView',
        children: [
          { text: 'GitHub', icon: 'github', link: 'https://github.com/gxmari007/coview' },
          { text: 'Ant Design', desc: 'React', link: 'https://ant.design/docs/react/introduce-cn' },
        ],
      },
      {
        text: '相关资源',
        children: [
          { text: 'Axure Library', desc: 'Axure 部件库', link: 'http://library.ant.design/' },
          { text: '设计资源集合', link: 'https://ant.design/docs/spec/download-cn' },
        ],
      },
    ],
  },
};
