import { Injectable } from '@angular/core';
import { debounceTime, filter, from, map, Observable, startWith, Subject, switchMap, tap } from 'rxjs';
import { DatabaseService } from 'src/app/core/services/database/database.service';
import { UploadSingleAttachmentService } from 'src/app/core/services/upload-attachments/upload-single-attachment.service';
import { uuidv4 } from 'src/app/modules/common-core/helpers';
import { GeoHazard } from 'src/app/modules/common-core/models';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';
import { AttachmentType, AttachmentUploadEditModel } from '../../models/attachment-upload-edit.interface';
import { RegistrationTid } from '../../registration.models';
import { NewAttachmentService } from './new-attachment.service';

const METADATA_KEY = 'REGOBS_IMAGE_METADATA';
const IMAGE_PREFIX = 'REGOBS_IMAGE';
const MAX_PREVIEW_WIDTH = 500;
const MAX_PREVIEW_HEIGHT = 500;
const PREVIEW_JPG_QUALITY = 1;

@Injectable()
export class WebAttachmentService extends NewAttachmentService {
  protected DEBUG_TAG = 'WebAttachmentService';
  private hasChange = new Subject<void>();

  constructor(
    protected logger: LoggingService,
    private uploadSingleAttachmentService: UploadSingleAttachmentService,
    private database: DatabaseService
  ) {
    super();
  }

  async addAttachment(
    registrationId: string,
    data: Blob,
    mimeType: string,
    geoHazard: GeoHazard,
    registrationTid: RegistrationTid,
    type?: AttachmentType,
    ref?: string
  ): Promise<void> {
    const attachmentId = uuidv4();
    const attachment: AttachmentUploadEditModel = {
      GeoHazardTID: geoHazard,
      RegistrationTID: registrationTid,
      AttachmentMimeType: mimeType,
      id: attachmentId,
      type,
      fileSize: data.size,
      fileAddedTime: Date.now(),
      ref,
    };

    const [uploadedAttachment, previewBlob] = await Promise.all([
      this.uploadSingleAttachmentService.upload(attachment, data),
      this.createPreviewBlob(data),
    ]);

    await this.saveImageToDB(previewBlob, attachmentId);
    this.saveAttachmentMeta(registrationId, uploadedAttachment);
  }

  private blobToBase64(data: Blob): Promise<string> {
    this.logger.debug('Converting image data to base64', this.DEBUG_TAG, { size: data.size });
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(data);
      reader.onloadend = () => {
        const dataAsBase64 = reader.result;
        resolve(dataAsBase64 as string);
      };
      reader.onerror = (err) => {
        reject(err);
      };
    });
  }

  private getImageKey(attachmentId: string) {
    return `${IMAGE_PREFIX}_${attachmentId}`;
  }

  private async saveImageToDB(data: Blob, attachmentId: string): Promise<void> {
    const key = this.getImageKey(attachmentId);
    this.logger.debug('Saving image to db', this.DEBUG_TAG, { attachmentId, size: data.size, key });
    const base64 = await this.blobToBase64(data);
    await this.database.set(key, base64);
    this.hasChange.next();
  }

  private readImageFromDB(attachmentId: string) {
    const key = this.getImageKey(attachmentId);
    this.logger.debug('Reading image from db', this.DEBUG_TAG, { attachmentId, key });
    return this.database.get<string>(key);
  }

  private createPreviewBlob(data: Blob): Promise<Blob> {
    this.logger.debug('Creating preview blob', this.DEBUG_TAG, { size: data.size });
    const blobUrl = window.URL.createObjectURL(data);
    const image = new Image();
    return new Promise<Blob>((resolve, reject) => {
      image.src = blobUrl;

      image.onerror = (err) => {
        window.URL.revokeObjectURL(blobUrl); // Clean up memory
        // TODO: err can be string or event, handle properly
        reject(err);
      };

      image.onload = () => {
        window.URL.revokeObjectURL(blobUrl);
        const [newWidth, newHeight] = calculateSize(image);
        const canvas = document.createElement('canvas');
        canvas.width = newWidth;
        canvas.height = newHeight;
        const context = canvas.getContext('2d');
        context.drawImage(image, 0, 0, newWidth, newHeight);
        canvas.toBlob(
          (previewBlob) => {
            this.logger.debug('Image preview created', this.DEBUG_TAG, {
              originalSize: data.size,
              previewSize: previewBlob.size,
              previewWidth: newWidth,
              previewHeight: newHeight,
            });
            resolve(previewBlob);
          },
          'image/jpg',
          PREVIEW_JPG_QUALITY
        );
      };
    });
  }

  private getMetadataKey(registrationId: string) {
    return `${METADATA_KEY}_${registrationId}`;
  }

  private async saveAttachmentMeta(registrationId: string, meta: AttachmentUploadEditModel) {
    const key = this.getMetadataKey(registrationId);
    this.logger.debug('Saving attachment metadata', this.DEBUG_TAG, { meta, registrationId, key });
    const existingAttachments = await this.readMetadataFromDb(registrationId);
    const otherAttachments = existingAttachments.filter((a) => a.id !== meta.id);
    await this.database.set(key, [...otherAttachments, meta]);
    this.hasChange.next();
  }

  saveAttachmentMeta$(registrationId: string, meta: AttachmentUploadEditModel): Observable<unknown> {
    return from(this.saveAttachmentMeta(registrationId, meta));
  }

  private async readMetadataFromDb(registrationId: string) {
    const key = this.getMetadataKey(registrationId);
    this.logger.debug('Reading metadata from db', this.DEBUG_TAG, { key });
    const metadata = await this.database.get<AttachmentUploadEditModel[]>(key);
    return metadata || [];
  }

  protected getAttachmentsObservable(registrationId: string): Observable<AttachmentUploadEditModel[]> {
    return this.hasChange.pipe(
      startWith(true),
      debounceTime(500),
      switchMap(() => this.readMetadataFromDb(registrationId)),
      tap((metadata) => this.logger.debug('Metadata', this.DEBUG_TAG, { metadata }))
    );
  }

  getBlob(registrationId: string, attachmentId: string): Observable<Blob> {
    return this.getAttachmentsObservable(registrationId).pipe(
      map((attachmens) => attachmens.find((a) => a.id === attachmentId)),
      filter((a) => a != null),
      switchMap(() => this.readImageFromDB(attachmentId)),
      switchMap((base64) => fetch(base64).then((res) => res.blob()))
    );
  }

  private async removeAttachmentInner(registrationId: string, attachmentId: string) {
    const imageKey = this.getImageKey(attachmentId);
    const metadataKey = this.getMetadataKey(registrationId);
    this.logger.debug('Remove attachment', this.DEBUG_TAG, { metadataKey, imageKey });
    try {
      await this.database.remove(imageKey);
    } catch (error) {
      this.logger.error(error, this.DEBUG_TAG, 'Failed to remove image from db');
    }
    const metadata = await this.readMetadataFromDb(registrationId);
    const newMeta = metadata.filter((m) => m.id !== attachmentId);
    await this.database.set(metadataKey, newMeta);
    this.hasChange.next();
    return true;
  }

  removeAttachment(registrationId: string, attachmentId: string): void {
    this.removeAttachmentInner(registrationId, attachmentId);
  }

  removeAttachment$(registrationId: string, attachmentId: string): Observable<boolean> {
    return from(this.removeAttachmentInner(registrationId, attachmentId));
  }

  async removeAttachments(registrationId: string): Promise<void> {
    this.logger.debug('Remove all attachments', this.DEBUG_TAG, { registrationId });
    const metadataKey = this.getMetadataKey(registrationId);
    const metadata = await this.readMetadataFromDb(registrationId);
    const imageKeys = metadata.map((m) => this.getImageKey(m.id));
    const removeAttachment = async (key: string) => {
      try {
        await this.database.remove(key);
      } catch (error) {
        this.logger.error(error, this.DEBUG_TAG, 'Failed to remove image from db');
      }
    };
    await Promise.allSettled(imageKeys.map((k) => removeAttachment(k)));
    await this.database.remove(metadataKey);
    this.hasChange.next();
  }

  removeAttachments$(registrationId: string): Observable<void> {
    return from(this.removeAttachments(registrationId));
  }
}

// TODO: https://labs.madisoft.it/javascript-image-compression-and-resizing/
function calculateSize(img: HTMLImageElement) {
  let width = img.width;
  let height = img.height;

  // calculate the width and height, constraining the proportions
  if (width > height) {
    if (width > MAX_PREVIEW_WIDTH) {
      height = Math.round((height * MAX_PREVIEW_WIDTH) / width);
      width = MAX_PREVIEW_WIDTH;
    }
  } else {
    if (height > MAX_PREVIEW_HEIGHT) {
      width = Math.round((width * MAX_PREVIEW_HEIGHT) / height);
      height = MAX_PREVIEW_HEIGHT;
    }
  }
  return [width, height];
}
