export interface OfflineSyncMeta<T> {
  id: string;
  lastUpdated: number;
  appVersion?: string;
  data: T;
}
