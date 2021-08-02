const fs = require('fs');
const path = require('path');
const rollup = require('rollup');
const vue = require('rollup-plugin-vue');
const typescript = require('@rollup/plugin-typescript');
const json = require('@rollup/plugin-json');
const upperFirst = require('lodash/upperFirst');

const pkg = require('../package.json');

const sourceDir = path.resolve(__dirname, '../src');

const packages = fs
  .readdirSync(sourceDir)
  .filter((f) => fs.statSync(`${sourceDir}/${f}`).isDirectory());

async function build() {
  const esPath = path.resolve(__dirname, '../es');
  const libPath = path.resolve(__dirname, '../lib');

  // clear es directory
  if (fs.existsSync(esPath)) {
    fs.rmSync(esPath, { force: true, recursive: true });
  }

  // clear lib directory
  if (fs.existsSync(libPath)) {
    fs.rmSync(libPath, { force: true, recursive: true });
  }

  // build components
  for (const package of packages) {
    const bundle = await rollup.rollup({
      input: path.resolve(__dirname, `../src/${package}/index.ts`),
      external: ['vue'],
      plugins: [
        vue({
          css: false,
        }),
        typescript(),
        json(),
      ],
    });

    // output es bundle
    await bundle.write({
      file: path.resolve(__dirname, `../es/${package}/index.js`),
      format: 'es',
    });

    // output umd bundle
    await bundle.write({
      file: path.resolve(__dirname, `../lib/${package}/index.js`),
      format: 'umd',
      name: `${pkg.name === package ? '' : 'V'}${upperFirst(package)}`,
      globals: {
        vue: 'Vue',
      },
    });

    console.log(`Build ${package} done.`);
  }
}

build().catch((e) => {
  console.error(e);
});
