import { RegObsObservation } from '../../models/regobs-observation.model';

export interface SearchResult {
    Offset: number;
    ResultsInPage: number;
    TotalMatches: number;
    Results: Array<RegObsObservation>;
}
