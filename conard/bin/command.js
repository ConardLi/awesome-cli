const yargs = require('yargs');
const pkg = require('../package.json');

const cc = require('../lib/cc');
const cl = require('../lib/cl');


module.exports = function () {

  /**
   * 代码复杂度
   */
  yargs.command('cc', '', {}, cc);

  /**
   * 代码行数
   */
  yargs.command('cl', '', {}, cl);

  /**
   * 版本
   */
  yargs.command('version', '', {}, () => {
    console.log(pkg.version);
  });

  yargs.argv;

};

