import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';
import gendiff from '../src/core.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const read = (filePath) => fs.readFileSync(filePath, 'utf-8').trim();
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const formatNames = [
  ['stylish'],
  ['plain'],
  ['json'],
];

describe.each(formatNames)('%s formatter', (formatName) => {
  let expectedResult;

  beforeAll(() => {
    const resultPath = getFixturePath(`${formatName}.output`);
    // eslint-disable-next-line
    expectedResult = read(resultPath);
  });

  test('json', () => {
    const filepath1 = getFixturePath('file1.json');
    const filepath2 = getFixturePath('file2.json');

    expect(gendiff(filepath1, filepath2, formatName)).toEqual(expectedResult);
  });

  test('yml', () => {
    const filepath1 = getFixturePath('file1.yml');
    const filepath2 = getFixturePath('file2.yml');

    expect(gendiff(filepath1, filepath2, formatName)).toEqual(expectedResult);
  });
});
