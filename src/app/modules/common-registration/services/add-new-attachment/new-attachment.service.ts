import { Observable } from 'rxjs';
import { GeoHazard } from '@varsom-regobs-common/core';
import { AttachmentType, AttachmentUploadEditModel, RegistrationTid } from '../../registration.models';

export abstract class NewAttachmentService {
  abstract addAttachment(registrationId: string, data: Blob, mimeType: string, geoHazard: GeoHazard, registrationTid: RegistrationTid, type?: AttachmentType, ref?: string): void;
  abstract saveAttachmentMeta$(meta: AttachmentUploadEditModel): Observable<unknown>;
  abstract saveAttachmentMeta(meta: AttachmentUploadEditModel): void;
  abstract getUploadedAttachments(registrationId: string): Observable<AttachmentUploadEditModel[]>;
  abstract getUploadedAttachment(registrationId: string, attachmentId: string): Observable<AttachmentUploadEditModel>;
  abstract getBlob(registrationId: string, attachmentId: string): Observable<Blob>;
  abstract removeAttachment(registrationId: string, attachmentId: string): void;
  abstract removeAttachment$(registrationId: string, attachmentId: string): Observable<boolean>;
  abstract removeAttachmentsForRegistration(registrationId: string): Promise<void>;
  abstract removeAttachmentsForRegistration$(registrationId: string): Observable<void>;
}
