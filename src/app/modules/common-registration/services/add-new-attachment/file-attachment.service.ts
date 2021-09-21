import { GeoHazard, uuidv4 } from '@varsom-regobs-common/core';
import { filter, from, Observable, Subject, switchMap, tap } from 'rxjs';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';
import { AttachmentType, AttachmentUploadEditModel } from '../../models/attachment-upload-edit.interface';
import { RegistrationTid } from '../../registration.models';
import { NewAttachmentService } from './new-attachment.service';
import { File } from '@ionic-native/file/ngx';
import { Injectable } from '@angular/core';

const DEBUG_TAG = 'FileAttachmentService';
const ROOT_DIR = 'attachments';

/**
 * Provides attachments saved on local drive
 */
@Injectable()
export default class FileAttachmentService implements NewAttachmentService {
  private hasCreatedRootFolder = false;
  private registrationIdEvents = new Subject<string>(); //get a tick with registrationId each time a registration's attachment changes

  constructor(private file: File, private loggingService: LoggingService) {
    this.registrationIdEvents.pipe(tap((registrationId) => this.loggingService.debug(`Attachments changed for registrationId ${registrationId}`, DEBUG_TAG)));
  }

  async addAttachment(registrationId: string, data: Blob, mimeType: string, geoHazard: GeoHazard, registrationTid: RegistrationTid, type?: AttachmentType, ref?: string): Promise<void> {
    const rootDir = await this.getRootPath();
    await this.file.createDir(rootDir, registrationId, true);
    const attachmentId = uuidv4();

    const attachmentFileName = `${attachmentId}.${this.getFileExtension(mimeType)}`;
    await this.file.writeFile(`${rootDir}/${registrationId}`, attachmentFileName, data, { replace: true });

    const metadata: AttachmentUploadEditModel = {
      GeoHazardTID: geoHazard,
      RegistrationTID: registrationTid,
      AttachmentMimeType: mimeType,
      id: attachmentId,
      type,
      fileSize: data.size,
      fileName: attachmentFileName,
      ref
    };
    this.loggingService.debug(`Attachment saved in ${rootDir}/${registrationId}/${attachmentFileName}`, DEBUG_TAG, metadata);
    this.saveAttachmentMeta(registrationId, metadata);
  }

  saveAttachmentMeta$(registrationId: string, meta: AttachmentUploadEditModel): Observable<unknown> {
    return from(this.getRootPath().then((rootDir) => this.file.writeFile(`${rootDir}/${registrationId}`, `${meta.id}.json`, JSON.stringify(meta), { replace: true })));
  }

  saveAttachmentMeta(registrationId: string, meta: AttachmentUploadEditModel): void {
    this.saveAttachmentMeta$(registrationId, meta)
      .pipe(tap(() => this.registrationIdEvents.next(registrationId))) //TODO: Dette burde vi gjort i saveAttachmentMeta$() fordi denne kan også kalles direkte
      .subscribe();
  }

  getAttachments(registrationId: string): Observable<AttachmentUploadEditModel[]> {
    return this.registrationIdEvents.pipe(
      filter((registrationIdForEvent) => registrationId === registrationIdForEvent),
      switchMap((registrationId) => from(this.getAttachmentsFromFile(registrationId)))
    );
    // return from(this.getAttachmentsFromFile(registrationId)); //TODO: SKal nok være levende, så må poste events hver gang vi legger til fil eller sletter en fil
  }

  getBlob(registrationId: string, attachmentId: string): Observable<Blob> {
    return from(this.getBlobInternal(registrationId, attachmentId));
  }

  removeAttachment$(registrationId: string, attachmentId: string): Observable<boolean> {
    return from(this.removeAttachmentInternal(registrationId, attachmentId));
  }

  removeAttachment(registrationId: string, attachmentId: string): void {
    this.removeAttachment$(registrationId, attachmentId).subscribe();
  }

  async removeAttachments(registrationId: string): Promise<void> {
    const path = await this.getRootPath();
    await this.file.removeDir(path, registrationId);
    //TODO: Gi beskjed om endringer
  }

  removeAttachments$(registrationId: string): Observable<void> {
    return from(this.removeAttachments(registrationId));
  }

  /**
   * Get file url for data directory
   * @returns file url as string, with trailing /
   */
  private getDataDirectoryFileUrl(): string {
    if (this.file && this.file.dataDirectory) {
      const fileUrl = this.file.dataDirectory;
      return fileUrl;
    }
    return undefined;
  }

  /**
   * Get root directory folder path
   * @returns directory path as string
   */
  private async getRootPath(): Promise<string> {
    const dataFolder = this.getDataDirectoryFileUrl();
    if (!this.hasCreatedRootFolder) {
      await this.file.createDir(dataFolder, ROOT_DIR, true);
      this.hasCreatedRootFolder = true;
    }
    return `${dataFolder}/${ROOT_DIR}`;
  }

  private async getAttachmentsFromFile(registrationId: string): Promise<AttachmentUploadEditModel[]> {
    const path = await this.getRootPath();
    const entries = await this.file.listDir(path, registrationId);
    return await Promise.all(entries.filter((entry) => entry.isFile).map((entry) => this.readMetadataFile(registrationId, entry.name)));
  }

  private async readMetadataFile(registrationId: string, filename: string): Promise<AttachmentUploadEditModel> {
    const rootDir = await this.getRootPath();
    const content = await this.file.readAsText(`${rootDir}/${registrationId}`, filename);
    return JSON.parse(content);
  }

  private async getBlobInternal(registrationId: string, attachmentId: string): Promise<Blob> {
    const rootDir = await this.getRootPath();
    const metadata = await this.readMetadataFile(registrationId, `${attachmentId}.json`);
    const buffer = await this.file.readAsArrayBuffer(`${rootDir}/${registrationId}`, metadata.fileName);
    return new Blob([buffer], { type: metadata.AttachmentMimeType });
  }

  private async removeAttachmentInternal(registrationId: string, attachmentId: string): Promise<boolean> {
    const rootPath = await this.getRootPath();
    const metadataFileName = this.getMetadataFileName(attachmentId);
    const metadata = await this.readMetadataFile(registrationId, metadataFileName);
    await this.file.removeFile(rootPath, metadata.fileName);
    await this.file.removeFile(rootPath, metadataFileName);
    return true;
    //TODO: Gi beskjed om endringer
  }

  private getMetadataFileName(attachmentId: string): string {
    return `${attachmentId}.json`;
  }

  private getFileExtension(mimeType: string): string {
    switch (mimeType) {
      case 'image/jpeg':
        return 'jpg';
      case 'image/png':
        return 'png';
    }
    return 'jpg';
  }
}
