/* tslint:disable */
import { LatLngObject } from './lat-lng-object';
export interface ObsLocationsResponseDtoV2 {
  Distance?: number;
  GeoHazardId?: number;
  Description?: string;
  Id?: number;
  LatLngObject?: LatLngObject;
  Name?: string;
  ObserverGroupId?: number;
  ObserverGroupName?: string;
  ObserverNickName?: string;
}
