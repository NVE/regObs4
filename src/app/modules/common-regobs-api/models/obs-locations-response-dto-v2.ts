/* tslint:disable */
import { LatLngObject } from './lat-lng-object';
export interface ObsLocationsResponseDtoV2 {
  Distance?: number;
  GeoHazardId?: number;
  Id?: number;
  LatLngObject?: LatLngObject;
  LocationDescription?: string;
  Name?: string;
  ObserverGroupId?: number;
  ObserverGroupName?: string;
  ObserverNickName?: string;
}
