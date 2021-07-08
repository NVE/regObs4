import { GeoHazard } from '@varsom-regobs-common/core';

export interface WarningGroupKey {
  geoHazard: GeoHazard;
  groupId: string;
  groupName: string;
}
