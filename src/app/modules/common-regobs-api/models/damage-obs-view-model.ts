/* tslint:disable */
import { AttachmentViewModel } from './attachment-view-model';
import { LatLng } from './lat-lng';
export interface DamageObsViewModel {
  GeoHazardName?: string;
  DamageTypeName?: string;
  Attachments?: Array<AttachmentViewModel>;
  GeoHazardTID?: number;
  DamageTypeTID: number;
  DamagePosition?: LatLng;
  Comment?: string;
}
