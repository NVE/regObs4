import { distinctUntilChanged, map, Observable, take, catchError, of, forkJoin, switchMap, OperatorFunction } from 'rxjs';
import { GeoHazard } from 'src/app/modules/common-core/models';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';
import { AttachmentType, AttachmentUploadEditModel, AttachmentUploadEditModelWithBlob, RegistrationTid } from '../../registration.models';

export interface GetAttachmentFilterOptions {
  /**
   * Filter for attachment type, eg. Water Level Attachments
   */
   type?: AttachmentType | 'All';
   /**
    * Reference used to filter attachments matching eg. one specific water level measurement
    */
   ref?: string;
   /**
    * Filter for registration type, eg. Danger Sign
    */
   registrationTid?: RegistrationTid;
}

type AttachmentFilter = OperatorFunction<AttachmentUploadEditModel[], AttachmentUploadEditModel[]>;

/**
 * Handle storage of new registration attachments on client before they are sent to server
 */
export abstract class NewAttachmentService {
  protected logger: LoggingService;
  protected DEBUG_TAG = 'NewAttachmentService';

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
   * Default implementation of filters, for usage inside {@link NewAttachmentService.getAttachments}.
   */
  protected getAttachmentFilterOperators(options?: GetAttachmentFilterOptions) {
    const defaultOptions = { includeBlob: true, type: 'All' };
    const { ref, type, registrationTid } = { ...defaultOptions, ...options };

    const filters: AttachmentFilter[] = [];

    if (registrationTid != null) {
      filters.push(map(attachments => attachments.filter(a => a.RegistrationTID === registrationTid)));
    }

    if (type !== 'All') {
      filters.push(map(attachments => attachments.filter(a => a.type === type)));
    }

    if (ref) {
      filters.push(map(attachments => attachments.filter(a => a.ref === ref)));
    }

    // We need to declare this as a tuple to allow usage spread operator by typescript
    return filters as [AttachmentFilter?, AttachmentFilter?, AttachmentFilter?];
  }

  protected compareByAddedTime = (a: AttachmentUploadEditModel, b: AttachmentUploadEditModel) => {
    if (a.fileAddedTime == null || b.fileAddedTime == null) {
      return 0;
    }
    return a.fileAddedTime - b.fileAddedTime;
  }

  protected abstract getAttachmentsObservable(registrationId: string): Observable<AttachmentUploadEditModel[]>;

  /**
   * Get list of attachment metadata each time an attachment (or attachment metadata) changes on provided registration.
   * The list is ordered by when the attachment was added (oldest first)
   */
  getAttachments(
    registrationId: string,
    options?: GetAttachmentFilterOptions
  ): Observable<AttachmentUploadEditModel[]> {
    return this.getAttachmentsObservable(registrationId).pipe(
      ...this.getAttachmentFilterOperators(options),
      map(attachments => attachments.sort(this.compareByAddedTime))
    );
  }

  getAttachmentsWithBlob(
    registrationId: string,
    options?: GetAttachmentFilterOptions
  ): Observable<AttachmentUploadEditModelWithBlob[]> {
    return this.getAttachments(registrationId, options).pipe(this.addBlobs(registrationId));
  }

  addBlobs(registrationId: string): OperatorFunction<AttachmentUploadEditModel[], AttachmentUploadEditModelWithBlob[]> {
    // Get the blob for a single attachment
    const addBlob = (attachment: AttachmentUploadEditModel): Observable<AttachmentUploadEditModelWithBlob> => {
      return this.getBlob(registrationId, attachment.id).pipe(
        take(1),
        map((blob) => ({ ...attachment, blob })),
        catchError((err) => {
          this.logger.error(err, this.DEBUG_TAG, 'Could not get blob from attachment');
          return of({ ...attachment, blob: undefined });
        })
      );
    };

    // Get blobs for all attachments
    const addBlobs = (attachments: AttachmentUploadEditModel[]) => forkJoin(attachments.map(a => addBlob(a)));

    return switchMap(attachments => attachments.length > 0 ? addBlobs(attachments) : of([]));
  }

  abstract getBlob(registrationId: string, attachmentId: string): Observable<Blob>;
  abstract removeAttachment(registrationId: string, attachmentId: string): void;
  abstract removeAttachment$(registrationId: string, attachmentId: string): Observable<boolean>;
  abstract removeAttachments(registrationId: string): Promise<void>;
  abstract removeAttachments$(registrationId: string): Observable<void>;
}
