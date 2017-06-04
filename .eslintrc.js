// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  extends: 'airbnb-base',
  // required to lint *.vue files
  plugins: ['html'],
  globals: {
    window: false,
    document: false,
  },
  // check if imports actually resolve
  settings: {
    'import/resolver': {
      webpack: {
        config: 'build/webpack.config.resolve.js',
      },
    },
  },
  // add your custom rules here
  rules: {
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      'js': 'never',
      'vue': 'never'
    }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-param-reassign': ['error', { props: false }],
    'no-unused-expressions': ['error', { allowTernary: true }],
    'no-shadow': 0,
    'no-mixed-operators': 0,
    'global-require': 0,
    'no-underscore-dangle': ['error', { allowAfterThis: true }],
  },
};
