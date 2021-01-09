import YAML from 'yaml';

const parseData = (data, fileType) => {
  switch (fileType) {
    case 'json':
      return JSON.parse(data);
    case 'yml':
    case 'yaml':
      return YAML.parse(data);
    default:
      throw new Error(`Unsupported file extension: ${fileType}`);
  }
};

export default parseData;
