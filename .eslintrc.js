module.exports = {
  // eslint 检查到 root 属性就不会到父级目录去找配置文件了
  root: true,
  // 使用 babel-eslint 作为 eslint 解析器
  parser: 'babel-eslint',
  // 使用 parser 解析器所需要用到的参数
  parserOptions: {
    sourceType: 'module',
  },
  extends: 'airbnb-base',
  // 定义预定义环境，能够获取各种环境的全局变量
  env: {
    browser: true,
  },
  // 允许使用浏览器环境定义的全局变量
  globals: {
    window: false,
    document: false,
  },
  plugins: ['html'],
  settings: {
    'import/resolver': {
      webpack: {
        config: 'build/webpack.config.base.js',
      },
    },
  },
  // 自定义规则
  rules: {
    'import/extensions': [2, 'always', {
      js: 'never',
      vue: 'never',
    }],
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
  },
};
