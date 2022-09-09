/* eslint-disable */
import { AttachmentEditModel } from './attachment-edit-model';
import { LatLng } from './lat-lng';
export interface DamageObsEditModel {
  Attachments?: Array<AttachmentEditModel>;
  Comment?: string;
  DamagePosition?: LatLng;
  DamageTypeTID: number;
  GeoHazardTID?: number;
}
