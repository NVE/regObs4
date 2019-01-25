/* tslint:disable */
import { UrlViewModel } from './url-view-model';
export interface LandSlideObsDto {
  UTMZoneStop?: number;
  StartLat?: number;
  StopLat?: number;
  StopLong?: number;
  DtLandSlideTime: string;
  DtLandSlideTimeEnd?: string;
  UTMNorthStart?: number;
  UTMEastStart?: number;
  UTMZoneStart?: number;
  UTMNorthStop?: number;
  UTMEastStop?: number;
  StartLong?: number;
  LandSlideTID?: number;
  LandSlideTriggerTID?: number;
  LandSlideSizeTID?: number;
  UsageFlagTID?: number;
  GeoHazardTID?: number;
  ActivityInfluencedTID?: number;
  ForecastAccurateTID?: number;
  DamageExtentTID?: number;
  Comment?: string;
  Urls?: Array<UrlViewModel>;
}
