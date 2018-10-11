export interface IDataLoad {
    id: string;
    lastUpdated?: Date;
    startedDate?: Date;
    completedDate?: Date;
    isLoading: boolean;
    progress?: number;
    status?: string;
    itemsComplete?: number;
    totalItems?: number;
    itemsFromDate?: Date;
    itemsToDate?: Date;
}
