import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, from, map, Observable, of, ReplaySubject, Subject, switchMap } from 'rxjs';
import { uuidv4 } from 'src/app/modules/common-core/helpers';
import { GeoHazard } from 'src/app/modules/common-core/models';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';
import { AttachmentType, AttachmentUploadEditModel } from '../../models/attachment-upload-edit.interface';
import { RegistrationTid } from '../../registration.models';
import { NewAttachmentService } from './new-attachment.service';

const METADATA_KEY = 'REGOBS_IMAGE_METADATA';
const IMAGE_PREFIX = 'REGOBS_IMAGE_';

@Injectable()
export class LocalStorageAttachmentService extends NewAttachmentService {
  meta = new BehaviorSubject<{ [registrationId: string]: AttachmentUploadEditModel[] }>({});
  protected DEBUG_TAG = 'LocalStorageAttachmentService';

  constructor(protected logger: LoggingService) {
    super();

    const dbRow = localStorage.getItem(METADATA_KEY) || '{}';
    const data = JSON.parse(dbRow);
    this.meta.next(data);
  }

  addAttachment(
    registrationId: string,
    data: Blob,
    mimeType: string,
    geoHazard: GeoHazard,
    registrationTid: RegistrationTid,
    type?: AttachmentType,
    ref?: string
  ): Promise<void> {
    const attachmentId = uuidv4();

    const metadata: AttachmentUploadEditModel = {
      GeoHazardTID: geoHazard,
      RegistrationTID: registrationTid,
      AttachmentMimeType: mimeType,
      id: attachmentId,
      type,
      fileSize: data.size,
      // fileName: attachmentFileName,
      fileAddedTime: Date.now(),
      ref,
    };

    return new Promise<void>((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(data);
      reader.onloadend = () => {
        const dataAsBase64 = reader.result;
        // Save in local storage
        localStorage.setItem(IMAGE_PREFIX + attachmentId, dataAsBase64 as string);

        // Save metadata
        const metaForReg = this.meta.value[registrationId] || [];
        const otherMeta = metaForReg.filter((m) => m.id !== attachmentId);
        const newMeta = {
          ...this.meta.value,
          [registrationId]: [...otherMeta, metadata],
        };

        localStorage.setItem(METADATA_KEY, JSON.stringify(newMeta));
        this.meta.next(newMeta);
        resolve();
      };
    });
  }
  saveAttachmentMeta$(registrationId: string, meta: AttachmentUploadEditModel): Observable<unknown> {
    const metaForReg = this.meta.value[registrationId] || [];
    const newMeta = {
      ...this.meta.value,
      [registrationId]: [...metaForReg.filter((a) => a.id !== meta.id), meta],
    };
    localStorage.setItem(METADATA_KEY, JSON.stringify(newMeta));
    this.meta.next(newMeta);
    return of(true);
  }

  protected getAttachmentsObservable(registrationId: string): Observable<AttachmentUploadEditModel[]> {
    return this.meta.pipe(map((meta) => meta[registrationId] || []));
  }

  getBlob(registrationId: string, attachmentId: string): Observable<Blob> {
    return this.getAttachmentsObservable(registrationId).pipe(
      map((attachmens) => attachmens.find((a) => a.id === attachmentId)),
      filter((a) => a != null),
      map((a) => localStorage.getItem(IMAGE_PREFIX + attachmentId)),
      switchMap((base64) => fetch(base64).then((res) => res.blob()))
    );
  }

  removeAttachment(registrationId: string, attachmentId: string): void {
    localStorage.removeItem(IMAGE_PREFIX + attachmentId);
    const metaForReg = this.meta.value[registrationId] || [];
    const newMeta = {
      ...this.meta.value,
      [registrationId]: metaForReg.filter((m) => m.id !== attachmentId),
    };
    localStorage.setItem(METADATA_KEY, JSON.stringify(newMeta));
    this.meta.next(newMeta);
  }
  removeAttachment$(registrationId: string, attachmentId: string): Observable<boolean> {
    this.removeAttachment(registrationId, attachmentId);
    return of(true);
  }
  removeAttachments(registrationId: string): Promise<void> {
    const { [registrationId]: metaForReg, ...otherMeta } = this.meta.value;
    (metaForReg || []).map((a) => a.id).forEach((id) => localStorage.removeItem(IMAGE_PREFIX + id));
    localStorage.setItem(METADATA_KEY, JSON.stringify(otherMeta));
    this.meta.next(otherMeta);
    return Promise.resolve();
  }
  removeAttachments$(registrationId: string): Observable<void> {
    return from(this.removeAttachments(registrationId));
  }
}
