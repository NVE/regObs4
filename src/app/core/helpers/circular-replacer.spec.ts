import { getCircularReplacer } from './circular-replacer';

describe('JSON stringify with circular references', () => {
  let o: { a: number; b: unknown };

  // Create circular reference
  beforeEach(() => {
    o = { a: 123, b: null };
    o.b = o;
  });

  it('Should throw a TypeError if still an issue', () => {
    // TypeError: Converting circular structure to JSON (V8-based)
    // TypeError: cyclic object value (Firefox)
    // TypeError: JSON.stringify cannot serialize cyclic structures. (Safari)
    expect(() => JSON.stringify(o)).toThrowMatching((err) => err instanceof TypeError);
  });

  it('JSON.stringify replacer will remove circular references', () => {
    expect(JSON.stringify(o, getCircularReplacer())).toEqual('{"a":123}');
  });

  it('JSON.stringify replacer will replace identical array objects with null', () => {
    // This is not ideal, but the replacer is very simpel.
    // We can use a more robust one if this is an issue.
    expect(JSON.stringify([o, o], getCircularReplacer())).toEqual('[{"a":123},null]');
  });
});
