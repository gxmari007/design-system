const path = require('path');

module.exports = {
  env: {
    jest: true,
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: {
          resolve: {
            alias: {
              '@': path.join(__dirname, '../../src'),
            },
          },
        },
      },
    },
  },
  rules: {
    'import/no-extraneous-dependencies': 'off',
  },
};
