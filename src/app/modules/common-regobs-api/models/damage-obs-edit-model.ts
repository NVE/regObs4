/* tslint:disable */
import { LatLng } from './lat-lng';
import { AttachmentEditModel } from './attachment-edit-model';
export interface DamageObsEditModel {
  GeoHazardTID?: number;
  DamageTypeTID: number;
  DamagePosition?: LatLng;
  Comment?: string;
  Attachments?: Array<AttachmentEditModel>;
}
