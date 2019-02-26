/* tslint:disable */
import { IncidentUrlsDto } from './incident-urls-dto';
export interface IncidentDto {
  IncidentIngress?: string;
  GeoHazardTID?: number;
  DamageExtentTID?: number;
  ForecastAccurateTID?: number;
  DtEndTime?: string;
  IncidentHeader?: string;
  ActivityInfluencedTID?: number;
  IncidentText?: string;
  SensitiveText?: string;
  UsageFlagTID?: number;
  Comment?: string;
  IncidentURLs?: Array<IncidentUrlsDto>;
}
