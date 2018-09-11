import { TripLogState } from './trip-log-state.enum';

export interface TripLogActivity {
    id?: number;
    state: TripLogState;
    timestamp: number;
}
