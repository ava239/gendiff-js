#!/usr/bin/env node
import commander from 'commander';
import compareFiles from '../src/core.js';

const { program } = commander;

program
  .version('0.0.1', '-V, --version', 'output the version number')
  .arguments('<filePath1> <filePath2>')
  .description('Compares two configuration files and shows a difference.')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2) => {
    console.log(compareFiles(filepath1, filepath2));
  })
  .parse(process.argv);
