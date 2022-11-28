import { ISyncProgressRecord } from './sync-progress-record.interface';

export interface ISyncProgress extends ISyncProgressRecord {
  estimatedTimeLeftMs: number;
  itemsLeft: number;
  percentageComplete: number;
  percentageCompleteFormatted: string;
  hasError: boolean;
  isComplete: boolean;
  inProgress: boolean;
}