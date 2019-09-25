#!/usr/bin/env node

const cc = require('../lib/cc');
const yargs = require('yargs');

yargs.command('cc', '', {}, cc);

yargs.argv;