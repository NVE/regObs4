import { GeoHazard } from '@varsom-regobs-common/core';

export interface SupportTile {
  name: string;
  description: string;
  url: string;
  enabled: boolean;
  opacity: number;
  geoHazardId: GeoHazard;
  disableWhenEnabled?: string[];
}
