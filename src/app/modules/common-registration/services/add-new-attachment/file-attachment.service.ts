import { GeoHazard, uuidv4 } from '@varsom-regobs-common/core';
import { BehaviorSubject, firstValueFrom, from, Observable, switchMap, tap } from 'rxjs';
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
  private attachmentsChanged = new BehaviorSubject<void>(undefined); //get a tick each time a registration's attachment changes

  constructor(private file: File, private loggingService: LoggingService) {
    this.attachmentsChanged.pipe(tap(() => this.loggingService.debug('Attachments changed', DEBUG_TAG)));
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
    await firstValueFrom(this.saveAttachmentMeta$(registrationId, metadata));
  }

  saveAttachmentMeta$(registrationId: string, meta: AttachmentUploadEditModel): Observable<unknown> {
    return from(
      this.getRootPath().then((rootDir) =>
        this.file.writeFile(`${rootDir}/${registrationId}`, `${meta.id}.json`, JSON.stringify(meta), { replace: true })
      )
    ).pipe(tap(() => this.attachmentsChanged.next()));
  }

  getAttachments(registrationId: string): Observable<AttachmentUploadEditModel[]> {
    return this.attachmentsChanged.pipe(switchMap(() => from(this.getAttachmentsFromFile(registrationId))));
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
    await this.file.removeDir(`${path}/`, registrationId);
    this.attachmentsChanged.next();
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
    return `${dataFolder}${ROOT_DIR}`;
  }

  private async getAttachmentsFromFile(registrationId: string): Promise<AttachmentUploadEditModel[]> {
    const path = await this.getRootPath();
    if (await this.directoryForRegistrationExists(registrationId)) {
      const entries = await this.file.listDir(path, registrationId);
      return await Promise.all(
        entries
          .filter((entry) => entry.isFile && entry.name.endsWith('.json'))
          .map((entry) => this.readMetadataFile(registrationId, entry.name))
      );
    }
    return [];
  }

  private async readMetadataFile(registrationId: string, filename: string): Promise<AttachmentUploadEditModel> {
    const rootDir = await this.getRootPath();
    if (!(await this.directoryForRegistrationExists(registrationId))) {
      throw Error(`Directory for registration ${rootDir}/${registrationId} does not exist`);
    }
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
    const path = `${rootPath}/${registrationId}/`;
    const metadataFileName = this.getMetadataFileName(attachmentId);
    const metadata = await this.readMetadataFile(registrationId, metadataFileName);
    await this.file.removeFile(path, metadata.fileName);
    await this.file.removeFile(path, metadataFileName);

    const remainingEntries = await this.file.listDir(rootPath, registrationId);
    if (remainingEntries.length === 0) {
      await this.file.removeDir(rootPath, registrationId);
    }
    this.attachmentsChanged.next();
    return true;
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

  private async directoryForRegistrationExists(registrationId: string): Promise<boolean> {
    const path = await this.getRootPath();
    try {
      await this.file.checkDir(`${path}/`, registrationId);
      return true;
    } catch (err) {
      return false;
    }
  }
}
