module.exports = {
  moduleFileExtensions: [
    'js',
    'jsx',
    'vue',
    'json',
    'ts',
    'tsx',
  ],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  snapshotSerializers: [
    'jest-serializer-vue',
  ],
  testMatch: [
    '<rootDir>/test/unit/**/*.spec.(ts|tsx)',
  ],
  globals: {
    "ts-jest": {
      useBabelrc: true
    }
  }
};
