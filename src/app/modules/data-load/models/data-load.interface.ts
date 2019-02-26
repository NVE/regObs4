export interface IDataLoad {
    id: string;
    lastUpdated?: string;
    startedDate?: string;
    completedDate?: string;
    isLoading: boolean;
    progress?: number;
    status?: string;
    itemsComplete?: number;
    totalItems?: number;
    itemsFromDate?: string;
    itemsToDate?: string;
    error?: boolean;
    errorMessage?: string;
}
