import fs from 'fs';
import _ from 'lodash';
import format from './format.js';

const getFileData = (filepath) => fs.readFileSync(filepath, 'utf8');

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

const compareFiles = (filepath1, filepath2) => {
  const fileData1 = getFileData(filepath1);
  const fileData2 = getFileData(filepath2);

  const data1 = JSON.parse(fileData1);
  const data2 = JSON.parse(fileData2);

  const diff = getDiff(data1, data2);

  return format(diff);
};

export default compareFiles;
