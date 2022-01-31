/* tslint:disable */
import { LatLngObject } from './lat-lng-object';
export interface ObsLocationsResponseDtoV2 {
  Name?: string;
  Id?: number;
  Distance?: number;
  LatLngObject?: LatLngObject;
  ObserverNickName?: string;
  ObserverGroupName?: string;
  ObserverGroupId?: number;
  GeoHazardId?: number;
}
