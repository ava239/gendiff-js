import _ from 'lodash';

const indentStep = '    ';
const operations = {
  kept: '  ',
  added: '+ ',
  removed: '- ',
};
const getIndent = (depth) => indentStep.repeat(depth);
const stringify = (value, depth) => {
  if (!_.isPlainObject(value)) {
    return value;
  }

  const obj = Object.keys(value)
    .map((key) => `${getIndent(depth + 1)}${key}: ${stringify(value[key], depth + 1)}`)
    .join('\n');

  return ['{', obj, `${getIndent(depth)}}`].join('\n');
};
const formatMessage = (key, operation, value, depth) => `  ${getIndent(depth)}${operation}${key}: ${stringify(value, depth + 1)}`;

const format = (diffData) => {
  const iter = (diff, depth = 0) => _.map(
    diff,
    (node) => {
      switch (node.type) {
        case 'changed':
          return [
            formatMessage(node.key, operations.removed, node.oldValue, depth),
            formatMessage(node.key, operations.added, node.newValue, depth),
          ];
        case 'kept':
        case 'removed':
          return formatMessage(node.key, operations[node.type], node.oldValue, depth);
        case 'added':
          return formatMessage(node.key, operations[node.type], node.newValue, depth);
        case 'complex':
          return [
            `${getIndent(depth + 1)}${node.key}: {`,
            iter(node.children, depth + 1),
            `${getIndent(depth + 1)}}`,
          ];
        default:
          throw new Error(`Unknown node type: '${node.type}'`);
      }
    },
  );
  return _.flattenDeep(['{', iter(diffData), '}']).join('\n');
};

export default format;
