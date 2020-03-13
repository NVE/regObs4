import { GeoHazard } from './geo-hazard.enum';

export interface SupportTile {
  name: string;
  description: string;
  url: string;
  enabled: boolean;
  opacity: number;
  geoHazardId: GeoHazard;
  disableWhenEnabled?: string[];
}
