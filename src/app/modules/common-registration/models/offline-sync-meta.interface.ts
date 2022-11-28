export interface OfflineSyncMeta<T> {
    id: string;
    lastUpdated: number;
    data: T;
}
