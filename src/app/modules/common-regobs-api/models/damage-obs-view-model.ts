/* tslint:disable */
import { AttachmentViewModel } from './attachment-view-model';
import { LatLng } from './lat-lng';
export interface DamageObsViewModel {
  Attachments?: Array<AttachmentViewModel>;
  Comment?: string;
  DamagePosition?: LatLng;
  DamageTypeName?: string;
  DamageTypeTID: number;
  GeoHazardName?: string;
  GeoHazardTID?: number;
}
