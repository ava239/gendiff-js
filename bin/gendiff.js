#!/usr/bin/env node
import commander from 'commander';
import compareFiles from '../src/core.js';

const { program } = commander;

program
  .version('1.0.0')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((filepath1, filepath2, { format }) => {
    console.log(compareFiles(filepath1, filepath2, format));
  })
  .parse(process.argv);
