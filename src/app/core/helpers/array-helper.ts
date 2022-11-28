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

  /**
   * @param array Array
   * @param fromIndex Reorder item from index
   * @param toIndex Reorder item to index
   * @returns New reordered array
   */
  static reorderList<T>(array: Array<T>, fromIndex: number, toIndex: number): Array<T> {
    if (!array || array.length === 0) {
      return array;
    }
    const arrayCopy = [...array];
    arrayCopy.splice(toIndex, 0, arrayCopy.splice(fromIndex, 1)[0]);
    return arrayCopy;
  }
}
