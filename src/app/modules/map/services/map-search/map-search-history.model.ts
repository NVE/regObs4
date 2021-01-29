import { MapSearchResponse } from './map-search-response.model';

export interface MapSearchHistory extends MapSearchResponse {
  timestamp: number;
}
