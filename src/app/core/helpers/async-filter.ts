export async function asyncFilter<T>(arr: T[], callback: (item: T) => Promise<boolean>): Promise<T[]> {
  const fail = Symbol();
  return (await Promise.all(arr.map(async item => (await callback(item)) ? item : fail)))
    .filter(i => i !== fail) as T[];
}
