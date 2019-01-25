/* tslint:disable */
import { PositionDto } from './position-dto';
import { PictureRequestDto } from './picture-request-dto';
export interface DamageObsDto {
  DamageTypeTID: number;
  DamagePosition?: PositionDto;
  GeoHazardTID?: number;
  UsageFlagTID?: number;
  Comment?: string;
  Pictures?: Array<PictureRequestDto>;
}
