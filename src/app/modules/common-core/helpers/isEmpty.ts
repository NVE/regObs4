/* eslint-disable @typescript-eslint/consistent-type-assertions */
/* eslint-disable @typescript-eslint/ban-types */
/**
 * @param obj
 * isEmpty(""), // true
 * isEmpty([]), // true
 * isEmpty({}), // true
 * isEmpty({length: undefined, custom_property: []}), // true
 *
 * isEmpty("Hello"), // false
 * isEmpty(33), // false
 * isEmpty([1,2,3]), // false
 * isEmpty({test: 1}), // false
 * isEmpty({length: 3, custom_property: [1,2,3]}) // false
 */
export function isEmpty(obj: Object | Array<Object>): boolean {
  if (obj === null || obj === undefined) {
    return true;
  }
  if (typeof (obj) === 'string') {
    return obj.length === 0;
  }
  if (typeof (obj) === 'number' || typeof (obj) === 'boolean') {
    return false;
  }
  if (obj instanceof Array) {
    const arr = (<Array<Object | Array<Object>>>obj);
    return arr.length === 0 || !arr.some((x) => !isEmpty(x));
  }
  const props = Object.getOwnPropertyNames(obj);
  if (props.length === 0) {
    return true;
  }
  return !props.some((prop) => !isEmpty(obj[prop]));
}
