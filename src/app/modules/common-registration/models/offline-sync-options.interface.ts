export interface IOfflineSyncOptions<T> {
  onBeforeRecordSync?: (row: T) => boolean | Promise<boolean>;
  onAfterRecordSync?: (row: T, success: boolean, error: Error) => void | Promise<unknown>;
}
