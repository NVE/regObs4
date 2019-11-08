/* tslint:disable */
import { UrlViewModel } from './url-view-model';
export interface LandslideViewModel {
  DtLandSlideTime?: string;
  UTMNorthStop?: number;
  UTMEastStop?: number;
  UTMZoneStop?: number;
  LandSlideTID?: number;
  LandSlideName?: string;
  LandSlideTriggerTID?: number;
  LandSlideTriggerName?: string;
  LandSlideSizeTID?: number;
  LandSlideSizeName?: string;
  Comment?: string;
  DtLandSlideTimeEnd?: string;
  GeoHazardTID?: number;
  GeoHazardName?: string;
  ActivityInfluencedTID?: number;
  ActivityInfluencedName?: string;
  ForecastAccurateTID?: number;
  ForecastAccurateName?: string;
  DamageExtentTID?: number;
  DamageExtentName?: string;
  UTMZoneStart?: number;
  UTMNorthStart?: number;
  UTMEastStart?: number;
  DtOffLandSlideTime?: string;
  DtOffLandSlideTimeEnd?: string;
  Urls?: Array<UrlViewModel>;
}
