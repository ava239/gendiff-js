import stylish from './formatters/stylish.js';

const format = (diffData, outputFormat) => {
  switch (outputFormat) {
    case 'stylish':
      return stylish(diffData);
    default:
      throw new Error(`Unknown format: ${outputFormat}`);
  }
};

export default format;
