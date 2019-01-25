/* tslint:disable */
import { UrlViewModel } from './url-view-model';
export interface GeneralObservationViewModel {
  GeoHazardTID?: number;
  GeoHazardName?: string;
  ObsComment?: string;
  ObsHeader?: string;
  Comment?: string;
  Urls?: Array<UrlViewModel>;
}
