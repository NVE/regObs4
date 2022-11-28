export interface ISyncProgressRecord {
  id: string;
  recordsLeft: Array<string>;
  totalRecords: number;
  startedTimestamp: number;
  errors: Array<{id: string, error: string | unknown}>;
}