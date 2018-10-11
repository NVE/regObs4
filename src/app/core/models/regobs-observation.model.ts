import { Observation } from './observation.model';
import { AppMode } from './app-mode.enum';

export interface RegObsObservation {
  AppMode: AppMode; // This is added as extra field when saving
  CompetenceLevelName: string;
  CompetenceLevelTid: number;
  DtChangeTime: string;
  DtObsTime: string;
  DtRegTime: string;
  ForecastRegionName: string;

  ForecastRegionTid: number;
  GeoHazardName: string;
  GeoHazardTid: number;
  LangKey: number;
  Latitude: number;
  LocationId: number;
  LocationName: string;
  Longitude: number;
  MunicipalName: string;
  MunicipalNo: number;
  NickName: string;
  ObserverGroupId: number;
  ObserverGroupName: string;
  ObserverId: number;
  Pictures: Observation[];
  RegId: number;
  Registrations: Observation[];
  SourceName: string;

  SourceTid: number;
  UtmEast: number;
  UtmNorth: number;
  UtmZone: number;
}
