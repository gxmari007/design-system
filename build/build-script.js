const rollup = require('rollup');
const version = require('../package.json').version;

const banner = `
/*!
 * CoView v${version}
 * (c) 2017-${new Date().getFullYear()} gxmari007
 * Released under the MIT License.
 */
`;
