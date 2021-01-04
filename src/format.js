import _ from 'lodash';

const indentStep = '    ';
const operations = {
  kept: '  ',
  added: '+ ',
  removed: '- ',
};
const getIndent = (depth) => indentStep.repeat(depth);
const formatMessage = (key, operation, value, depth) => `  ${getIndent(depth)}${operation}${key}: ${value}`;

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
        default:
          throw new Error(`Unknown node type: '${node.type}'`);
      }
    },
  );
  return _.flattenDeep(['{', iter(diffData), '}']).join('\n');
};

export default format;
