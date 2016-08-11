import KeyValueMap from 'data-types/key-value-map';

const definition = {
  all: 0,
  trace: 1,
  debug: 2,
  info: 3,
  warning: 4,
  error: 5,
  fatal: 6,
  none: 7,
};

export default new KeyValueMap(definition);
