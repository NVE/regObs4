/* tslint:disable */
import { UrlViewModel } from './url-view-model';
export interface GeneralObservationEditModel {
  GeoHazardTID?: number;
  ObsComment?: string;
  ObsHeader?: string;
  UsageFlagTID?: number;
  Comment?: string;
  Urls?: Array<UrlViewModel>;
}
