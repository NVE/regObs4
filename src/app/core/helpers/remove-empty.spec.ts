/* eslint-disable @typescript-eslint/no-explicit-any */
import { removeEmpty } from './remove-empty';

// Delvis copilot-generert
describe('removeEmpty', () => {
  it('should remove properties with null values', () => {
    const input: any = { a: 1, b: null, c: 2 };
    const result = removeEmpty(input);
    expect(result).toEqual({ a: 1, c: 2 });
  });

  it('should remove properties with undefined values', () => {
    const input: any = { a: undefined, b: 2, c: 3 };
    const result = removeEmpty(input);
    expect(result).toEqual({ b: 2, c: 3 });
  });

  it('should keep properties with falsy but not null/undefined values', () => {
    const input: any = { a: 0, b: false, c: '', d: null, e: undefined };
    const result = removeEmpty(input);
    expect(result).toEqual({ a: 0, b: false, c: '' });
  });

  it('should return an empty object if all properties are null or undefined', () => {
    const input: any = { a: null, b: undefined };
    const result = removeEmpty(input);
    expect(result).toEqual({});
  });

  it('should not modify the original object', () => {
    const input = { a: 1, b: null };
    const copy = { ...input };
    removeEmpty(input);
    expect(input).toEqual(copy);
  });

  it('should return the same object if there are no null or undefined properties', () => {
    const input = { a: 1, b: 2 };
    const result = removeEmpty(input);
    expect(result).toEqual({ a: 1, b: 2 });
  });

  it('should work with empty objects', () => {
    const input = {};
    const result = removeEmpty(input);
    expect(result).toEqual({});
  });

  it('should remove empty arrays', () => {
    const input: any = { a: 1, b: 2, c: [] };
    const result = removeEmpty(input);
    expect(result).toEqual({ a: 1, b: 2 });
  });

  it('should not remove arrays with values', () => {
    const input = { c: [1] };
    const result = removeEmpty(input);
    expect(result).toEqual({ c: [1] });
  });
});
