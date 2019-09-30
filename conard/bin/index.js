#!/usr/bin/env node

const cc = require('../lib/cc');
const cl = require('../lib/cl');

const yargs = require('yargs');

yargs.command('cc', '', {}, cc);
yargs.command('cl', '', {}, cl);


yargs.argv;