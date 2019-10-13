const yargs = require('yargs');

const cc = require('../lib/cc');
const cl = require('../lib/cl');


module.exports = function () {

  yargs.command('cc', '', {}, cc);
  yargs.command('cl', '', {}, cl);

  yargs.argv;

};

