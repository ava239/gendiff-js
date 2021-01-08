import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';
import gendiff from '../src/core.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const read = (filePath) => fs.readFileSync(filePath, 'utf-8').trim();
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('flat json', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');
  const resultPath = getFixturePath('output');
  const expectedResult = read(resultPath);

  expect(gendiff(filepath1, filepath2)).toEqual(expectedResult);
});

test('flat yml', () => {
  const filepath1 = getFixturePath('file1.yml');
  const filepath2 = getFixturePath('file2.yml');
  const resultPath = getFixturePath('output');
  const expectedResult = read(resultPath);

  expect(gendiff(filepath1, filepath2)).toEqual(expectedResult);
});
