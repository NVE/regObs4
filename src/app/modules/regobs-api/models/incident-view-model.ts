/* tslint:disable */
import { UrlViewModel } from './url-view-model';
export interface IncidentViewModel {
  ForecastAccurateName?: string;
  GeoHazardTID?: number;
  ActivityInfluencedTID?: number;
  ActivityInfluencedName?: string;
  DamageExtentTID?: number;
  DamageExtentName?: string;
  ForecastAccurateTID?: number;
  GeoHazardName?: string;
  DtEndTime?: string;
  IncidentHeader?: string;
  IncidentIngress?: string;
  IncidentText?: string;
  Comment?: string;
  IncidentURLs?: Array<UrlViewModel>;
}
