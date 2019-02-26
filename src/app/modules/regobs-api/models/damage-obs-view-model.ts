/* tslint:disable */
import { PositionDto } from './position-dto';
export interface DamageObsViewModel {
  GeoHazardTID?: number;
  GeoHazardName?: string;
  DamageTypeTID?: number;
  DamageTypeName?: string;
  DamagePosition?: PositionDto;
  Comment?: string;
  Attachments?: Array<number>;
}
