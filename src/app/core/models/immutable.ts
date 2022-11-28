// eslint-disable-next-line @typescript-eslint/ban-types
type ImmutablePrimitive = undefined | null | boolean | string | number | Function;
export type Immutable<T> =
  T extends ImmutablePrimitive ? T :
  T extends Array<infer U> ? ImmutableArray<U> :
  ImmutableObject<T>;
type ImmutableArray<T> = ReadonlyArray<Immutable<T>>;
type ImmutableObject<T> = { readonly [K in keyof T]: Immutable<T[K]> };