import { isEmpty } from './isEmpty';

export function isArraysEqual(array1: ReadonlyArray<number>, array2: ReadonlyArray<number>): boolean {
  return array1.length === array2.length && array1.every((value, index) => value === array2[index]);
}

export function addOrUpdateValueByIndex<T>(index: number, value: T, values: T[], addEmpty = false): T[] {
  let updatedValues: T[];

  if (index >= 0 && index < values.length) {
    // Update
    updatedValues = values.map((v, i) => (i === index ? value : v));
  } else if (index === values.length) {
    // Add
    if (!isEmpty(value) || addEmpty) {
      updatedValues = [...values, value];
    } else {
      updatedValues = [...values]; // No empty value added
    }
  } else {
    throw new Error('Invalid index');
  }

  return updatedValues;
}

type PickPropertyTypes<T, V> = {
  [K in keyof T as T[K] extends V ? K : never]: T[K];
};

export function sortByNumberProp<T, Prop extends keyof PickPropertyTypes<T, number | undefined | null>>(
  layers: T[],
  prop: Prop
): T[] {
  // Bytte til toSorted når vi får tilgang til det
  return [...layers].sort(
    (a, b) => ((a[prop] as number | undefined | null) || 0) - ((b[prop] as number | undefined | null) || 0)
  );
}
