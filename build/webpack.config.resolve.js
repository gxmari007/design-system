const resolve = require('./utils').resolve;

module.exports = {
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      src: resolve('src'),
      components: resolve('src/components'),
      directives: resolve('src/directives'),
      mixins: resolve('src/mixins'),
      utils: resolve('src/utils'),
      // docs proxy
      coview: resolve('src'),
      views: resolve('docs/views'),
    },
  },
};
