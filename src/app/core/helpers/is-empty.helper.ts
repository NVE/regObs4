import stringify from 'json-stringify-safe';

export class IsEmptyHelper {
  static isEmpty(obj: unknown | Array<unknown | Array<unknown>>) {
    if (obj === null || obj === undefined) {
      return true;
    } else if (typeof obj === 'string') {
      return obj.length === 0;
    } else if (typeof obj === 'number' || typeof obj === 'boolean') {
      return false;
    } else if (obj instanceof Array) {
      const arr = <Array<unknown | Array<unknown>>>obj;
      return arr.length === 0 || !arr.some((x) => !IsEmptyHelper.isEmpty(x));
    } else {
      const props = Object.getOwnPropertyNames(obj);
      if (props.length === 0) {
        return stringify(obj) === '{}';
      } else {
        return !props.some((x) => !IsEmptyHelper.isEmpty(obj[x]));
      }
    }
  }
}
