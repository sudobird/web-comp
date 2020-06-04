export const TYPES = {
  BLANK_ARRAY: 'BLANK_ARRAY',
  BLANK_OBJECT: 'BLANK_OBJECT',
  ARRAY: 'ARRAY',
  OBJECT: 'OBJECT',
  STRING: 'STRING',
  NUMBER: 'NUMBER',
  BOOLEAN: 'BOOLEAN'
};

export const getType = (item) => {
  const type = Object.prototype.toString.call(item);
  switch (type) {
    case '[object Array]':
      if (item.length) {
        return TYPES.ARRAY;
      }
      return TYPES.BLANK_ARRAY;

    case '[object Object]':
      if (Object.keys(item).length) {
        return TYPES.OBJECT;
      }
      return TYPES.BLANK_OBJECT;

    case '[object String]':
      return TYPES.STRING;

    case '[object Number]':
      return TYPES.NUMBER;

    case '[object Boolean]':
      return TYPES.BOOLEAN;

    default:
      return null;
  }
}
