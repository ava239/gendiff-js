import _ from 'lodash';

const stringify = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }

  if (_.isString(value)) {
    return `'${value}'`;
  }

  return value;
};

const format = (diffData) => {
  const iter = (diff, prefix = '') => _.map(
    diff,
    (node) => {
      const nodeKey = `${prefix}${node.key}`;
      switch (node.type) {
        case 'kept':
          return [];
        case 'changed':
          return `Property '${nodeKey}' was updated. From ${stringify(node.oldValue)} to ${stringify(node.newValue)}`;
        case 'removed':
          return `Property '${nodeKey}' was removed`;
        case 'added':
          return `Property '${nodeKey}' was added with value: ${stringify(node.newValue)}`;
        case 'complex':
          return iter(node.children, `${nodeKey}.`);
        default:
          throw new Error(`Unknown node type: '${node.type}'`);
      }
    },
  );
  return _.flattenDeep(iter(diffData)).join('\n');
};

export default format;
