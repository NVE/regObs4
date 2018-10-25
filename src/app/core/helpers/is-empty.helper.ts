export class IsEmptyHelper {
    static isEmpty(obj: Object | Array<Object | Array<Object>>) {
        if (obj === null || obj === undefined) {
            return true;
        }
        if (typeof (obj) === 'string') {
            return obj.length === 0;
        } else if (typeof (obj) === typeof (Array)) {
            const arr = (<Array<Object | Array<Object>>>obj);
            return arr.length === 0 || !arr.some((x) => !IsEmptyHelper.isEmpty(x));
        } else {
            const props = Object.getOwnPropertyNames(obj);
            return props.length === 0 || !props.some(x => !IsEmptyHelper.isEmpty(obj[x]));
        }
    }
}
