const webpack = require('webpack');
const pkg = require('../../package.json');

module.exports = {
  // 配置 head 标签内容
  head: [
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Titillium+Web' }],
  ],
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        'process.env.VERSION': JSON.stringify(pkg.version),
      }),
    ],
  },
};
