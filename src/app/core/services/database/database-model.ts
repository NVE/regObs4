interface KeyValueStore {
  set(key: string, value: any): Promise<void>;
  get(key: string): Promise<any>;
}