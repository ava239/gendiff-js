import stylish from './stylish.js';
import plain from './plain.js';

const format = (diffData, formatName) => {
  switch (formatName) {
    case 'stylish':
      return stylish(diffData);
    case 'plain':
      return plain(diffData);
    default:
      throw new Error(`Unknown format: ${formatName}`);
  }
};

export default format;
