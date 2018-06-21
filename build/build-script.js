const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const rollup = require('rollup');
const uglify = require('uglify-js');
const chalk = require('chalk');
const config = require('./config');

const builds = config.getAllBuilds();
const dirs = config.dirs;

function logError(e) {
  console.log(e);
}

function getSize (code) {
  return `${(code.length / 1024).toFixed(2)}kb`;
}

function write(dest, code, zip) {
  return new Promise((resolve, reject) => {
    function report(extra) {
      const text = `${path.relative(process.cwd(), dest)} ${getSize(code)}${extra || ''}.`;

      console.log(`${chalk.cyan('[BUILD]')} ${chalk.yellow('JS')} : ${chalk.green(text)}`);
      resolve();
    }

    fs.writeFile(dest, code, (err) => {
      if (err) return reject(err);
      if (zip) {
        zlib.gzip(code, (err, zipped) => {
          if (err) return reject(err);
          report(` (gzipped: ${getSize(zipped)})`);
        });
      } else {
        report();
      }
    });
  });
}

function buildLib(config) {
  const { output } = config;
  const { file, banner } = output;
  const isProd = /min\.js$/.test(file);

  return rollup.rollup(config)
    .then(bundle => bundle.generate(output))
    .then(({ code }) => {
      const content = isProd
        ? (banner ? banner + '\n' : '') + uglify.minify(code, { warnings: false }).code
        : code;

      return write(file, content, isProd);
    });
}

async function build(builds) {
  let index = 0;
  const total = builds.length;
  const next = () => {
    buildLib(builds[index]).then(() => {
      index++;

      if (index < total) {
        next();
      }
    }).catch(logError);
  };

  next();
}

if (!fs.existsSync('lib')) {
  for (let i = 0, len = dirs.length; i < len; i++) {
    fs.mkdirSync(dirs[i]);
  }
}

build(builds);
