const deepClone = <T>(obj: T, map = new Map()):T => {
  if (typeof obj !== 'object') {
    return obj;
  }

  if (map.get(obj)) {
    return obj;
  }

  let result: any = {};

  if (Array.isArray(obj)) {
    result = [];
  }

  // 循环引用
  map.set(obj, result);

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result[key] = deepClone(obj[key], map);
    }
  }

  return result;
};

export const deepCloneString = `const deepClone = <T>(obj: T, map = new Map()):T => {
  if (typeof obj !== 'object') {
    return obj;
  }

  if (map.get(obj)) {
    return obj;
  }

  let result: any = {};

  if (Array.isArray(obj)) {
    result = [];
  }

  // 循环引用
  map.set(obj, result);

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result[key] = deepClone(obj[key], map);
    }
  }

  return result;
};
`;

export default deepClone;
