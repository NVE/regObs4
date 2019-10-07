/* tslint:disable */
import { UrlViewModel } from './url-view-model';
export interface IncidentViewModel {
  GeoHazardTID?: number;
  GeoHazardName?: string;
  ActivityInfluencedTID?: number;
  ActivityInfluencedName?: string;
  DamageExtentTID?: number;
  DamageExtentName?: string;
  ForecastAccurateTID?: number;
  ForecastAccurateName?: string;
  DtEndTime?: string;
  IncidentHeader?: string;
  IncidentIngress?: string;
  IncidentText?: string;
  Comment?: string;
  IncidentURLs?: Array<UrlViewModel>;
}
