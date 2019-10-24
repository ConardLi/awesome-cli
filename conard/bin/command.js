const yargs = require('yargs');
const pkg = require('../package.json');

const cc = require('../lib/cc');
const cl = require('../lib/cl');
const logo = require('../lib/logo');



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

  /**
   * logo
   */
  yargs.command('$0', '', {}, logo);

  yargs.argv;

};

