/**
 * docs 配置文件
 */
module.exports = {
  // 配置页面 head 参数
  head: {
    titleTemplate: '%s - CoView',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'renderer', content: 'webkit' },
    ],
    link: [
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Lato' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto' }
    ],
  },

  // 配置文档源文件路径
  srcDir: 'docs/',

  // 配置 loading 组件样式
  loading: { color: '#1890ff' },

  // 构建方面的配置
  build: {
    // 扩展 webpack 配置
    extend(config, { isDev, isClient, isServer }) {
      // 添加 ESLint 检查
      if (isDev && isClient) {
        config.module.rules.push({
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          enforce: 'pre',
          exclude: /(node_modules)/,
        });
      }
    },
    // 外部引入样式文件单独打包
    extractCSS: { allChunks: true },
    // 将 coview 打包进 vendor 中
    vendor: [
      '~/../src'
    ]
  },

  css: [
    '~/../src/style/index.less'
  ],

  // 插件
  plugins: [
    '~/plugins/coview',
  ],
};
