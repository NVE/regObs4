import { TripLogState } from './trip-log-state.enum';

export interface TripLogActivity {
    id?: string;
    state: TripLogState;
    timestamp: number;
}
