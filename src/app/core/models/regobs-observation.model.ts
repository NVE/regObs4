import { Observation } from './observation.model';

export interface RegObsObservation {
  CompetenceLevelName: string;
  CompetenceLevelTid: number;
  DtChangeTime: Date;
  DtObsTime: Date;
  DtRegTime: Date;
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
