import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import format from './formatters.js';
import parseData from './parsers.js';

const getFileData = (filepath) => {
  const contents = fs.readFileSync(filepath, 'utf8');
  const fileType = path.extname(filepath).substr(1);

  return { contents, fileType };
};

const getDiff = (object1, object2) => {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);
  const allKeys = _.union(keys1, keys2).sort();

  return allKeys.map((key) => {
    const oldValue = _.get(object1, key);
    const newValue = _.get(object2, key);

    if (_.has(object1, key) && !_.has(object2, key)) {
      return { key, type: 'removed', oldValue };
    }

    if (!_.has(object1, key) && _.has(object2, key)) {
      return { key, type: 'added', newValue };
    }

    if (_.isPlainObject(oldValue) && _.isPlainObject(newValue)) {
      return { key, type: 'complex', children: getDiff(oldValue, newValue) };
    }

    if (!_.isEqual(oldValue, newValue)) {
      return {
        key,
        type: 'changed',
        oldValue,
        newValue,
      };
    }

    return { key, type: 'kept', oldValue };
  });
};

const compareFiles = (filepath1, filepath2, outputFormat = 'stylish') => {
  const fileData1 = getFileData(filepath1);
  const fileData2 = getFileData(filepath2);

  const data1 = parseData(fileData1.contents, fileData1.fileType);
  const data2 = parseData(fileData2.contents, fileData2.fileType);

  const diff = getDiff(data1, data2);

  return format(diff, outputFormat);
};

export default compareFiles;
