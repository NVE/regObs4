export class ArrayHelper {
    static liftToArray<T>(item: T | T[]) {
        if (item instanceof Array) {
            return item;
        } else if (item) {
            return [item];
        } else {
            return [];
        }
    }
}
