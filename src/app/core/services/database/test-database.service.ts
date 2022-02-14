/**
 * You may use this to mock the DatabaseService
 */
export class TestDatabaseService implements KeyValueStore {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private store: Map<string, any> = new Map();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async set(key: string, value: any): Promise<void> {
    this.store.set(key, value);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async get(key: string): Promise<any> {
    return this.store.get(key);
  }
}