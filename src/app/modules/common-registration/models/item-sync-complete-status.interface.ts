export interface ItemSyncCompleteStatus<T> {
    item: T;
    success: boolean;
    statusCode?: number;
    error?: string;
}
