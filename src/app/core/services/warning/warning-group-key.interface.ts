import { GeoHazard } from 'src/app/modules/common-core/models';

export interface WarningGroupKey {
  geoHazard: GeoHazard;
  groupId: string;
  groupName: string;
}
