const figlet = require('figlet');
const pkg = require('../package.json');
const chalk = require('chalk');



module.exports = function () {
  figlet('conard', { font: '3D-ASCII' }, function (err, data) {
    if (err) {
      return;
    }
    console.log(chalk.green(data));
    console.log(chalk.green('Version:' + pkg.version));
  });
};