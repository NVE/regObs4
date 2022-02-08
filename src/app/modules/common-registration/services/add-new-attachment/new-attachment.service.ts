import { Observable } from 'rxjs';
import { GeoHazard } from 'src/app/modules/common-core/models';
import { AttachmentType, AttachmentUploadEditModel, RegistrationTid } from '../../registration.models';

/**
 * Handle storage of new registration attachments on client before they are sent to server
 */
export abstract class NewAttachmentService {
  abstract addAttachment(
    registrationId: string,
    data: Blob,
    mimeType: string,
    geoHazard: GeoHazard,
    registrationTid: RegistrationTid,
    type?: AttachmentType,
    ref?: string
  ): Promise<void>;
  abstract saveAttachmentMeta$(registrationId: string, meta: AttachmentUploadEditModel): Observable<unknown>;

  /**
   * Get list of attachment metadata each time an attachment (or attachment metadata) changes on provided registration
   */
  abstract getAttachments(registrationId: string): Observable<AttachmentUploadEditModel[]>;

  abstract getBlob(registrationId: string, attachmentId: string): Observable<Blob>;
  abstract removeAttachment(registrationId: string, attachmentId: string): void;
  abstract removeAttachment$(registrationId: string, attachmentId: string): Observable<boolean>;
  abstract removeAttachments(registrationId: string): Promise<void>;
  abstract removeAttachments$(registrationId: string): Observable<void>;
}