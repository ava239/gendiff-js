import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const format = (diffData, formatName) => {
  switch (formatName) {
    case 'stylish':
      return stylish(diffData);
    case 'plain':
      return plain(diffData);
    case 'json':
      return json(diffData);
    default:
      throw new Error(`Unknown format: ${formatName}`);
  }
};

export default format;
