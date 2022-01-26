import { GeoHazard } from 'src/app/modules/common-core/models';

export interface SupportTile {
  name: string;
  description: string;
  url: string;
  enabled: boolean;
  opacity: number;
  geoHazardId: GeoHazard;
  disableWhenEnabled?: string[];
}
