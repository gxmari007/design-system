const path = require('path');

// 指定 gulpfile 配置文件路径
process.argv.push(
  '--gulpfile',
  path.resolve(__dirname, './config.style.js'),
);

// node 运行时调用 gulp 命令
require('gulp/bin/gulp');
