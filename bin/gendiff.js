#!/usr/bin/env node

const { program } = require('commander');

program
  .version('0.0.1', '-V, --version', 'output the version number')
  .arguments('<filePath1> <filePath2>')
  .description('Compares two configuration files and shows a difference.')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format [type]', 'output format');

program.parse(process.argv);
