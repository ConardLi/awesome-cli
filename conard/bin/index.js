#!/usr/bin/env node
const command = require('./command');
const update = require('./update');



function main() {

  update();

  command();

}


main();