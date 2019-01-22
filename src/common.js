/**
 * 根据指定的枚举值和枚举数组，找出其枚举对应的标签；
 * @param {*} value 枚举值
 * @param {*} enums 枚举数组
 */
export const getEnumObject = (enums, value, key = 'value') => {
  const res = enums.filter(item => item[key] === value);
  return res.length > 0 ? res[0] : {};
};