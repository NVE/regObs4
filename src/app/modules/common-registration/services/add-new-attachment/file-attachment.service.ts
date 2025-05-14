import { GeoHazard } from 'src/app/modules/common-core/models';
import { uuidv4 } from 'src/app/modules/common-core/helpers';
import { BehaviorSubject, firstValueFrom, from, Observable, switchMap, tap } from 'rxjs';
import { AttachmentType, AttachmentUploadEditModel } from '../../models/attachment-upload-edit.interface';
import { RegistrationTid } from '../../registration.models';
import { NewAttachmentService } from './new-attachment.service';
import { Injectable } from '@angular/core';
import { Directory, Encoding, FileInfo, Filesystem } from '@capacitor/filesystem';
import { Capacitor } from '@capacitor/core';

const ROOT_DIR = 'attachments';

/**
 * Provides attachments saved on local drive
 */
@Injectable()
export default class FileAttachmentService extends NewAttachmentService {
  protected override DEBUG_TAG = 'FileAttachmentService';
  private attachmentsChanged = new BehaviorSubject<void>(undefined); //get a tick each time an attachment changes
  private rootFileUrl = '';

  constructor() {
    super();
    this.attachmentsChanged.pipe(tap(() => this.logger.debug('Attachments changed', this.DEBUG_TAG)));
  }

  /**
   * @returns sti til mappa vi lagrer vedleggene i for alle registreringer, uten / på slutten
   */
  private async getRootFileUrl(): Promise<string> {
    if (this.rootFileUrl === '') {
      const dataDirectory = Directory.Data;
      const readDirResult = await Filesystem.readdir({
        path: '',
        directory: dataDirectory,
      });
      if (readDirResult.files.filter((fileInfo) => fileInfo.name === ROOT_DIR).length === 0) {
        //no root folder yet, so create it
        await Filesystem.mkdir({
          path: ROOT_DIR,
          directory: dataDirectory,
        });
      }
      const uriResult = await Filesystem.getUri({
        path: ROOT_DIR,
        directory: dataDirectory,
      });
      this.rootFileUrl = uriResult.uri;

      if (this.rootFileUrl.endsWith('/')) {
        this.rootFileUrl = this.rootFileUrl.slice(0, -1);
      }
    }
    return this.rootFileUrl;
  }

  /**
   * @returns sti til mappa vi lagrer vedleggene i for angitt registrering, uten / på slutten
   */
  private async getFolderPath(registrationId: string): Promise<string> {
    const rootFileUrl = await this.getRootFileUrl();
    const dataDirectory = Directory.Data;
    const folderPath = `${rootFileUrl}/${registrationId}`;
    const readDirResult = await Filesystem.readdir({
      path: rootFileUrl,
      directory: dataDirectory,
    });

    // sjekk om mappa for registrering allerede finnes
    if (readDirResult.files.filter((fileInfo) => fileInfo.name === registrationId).length === 0) {
      //opprett mappa for registreringa hvis den ikke finnes
      await Filesystem.mkdir({
        path: folderPath,
        directory: dataDirectory,
      });
    }

    const uriResult = await Filesystem.getUri({
      path: folderPath,
      directory: dataDirectory,
    });

    const uri = uriResult.uri;
    if (uri.endsWith('/')) {
      return uri.slice(0, -1);
    }
    return uri;
  }

  async addAttachmentAsUrl(
    registrationId: string,
    fileNameWithFullPath: string,
    mimeType: string,
    geoHazard: GeoHazard,
    registrationTid: RegistrationTid,
    type: AttachmentType = 'Attachment',
    ref?: string
  ): Promise<void> {
    const attachmentId = uuidv4();
    const attachmentFileName = `${attachmentId}.${this.getFileExtension(mimeType)}`;
    const destinationPath = await this.getFolderPath(registrationId);
    const result = await Filesystem.copy({
      from: `${fileNameWithFullPath}`,
      to: `${destinationPath}/${attachmentFileName}`,
    });
    const statResult = await Filesystem.stat({ path: `${result.uri}` });
    const metadata: AttachmentUploadEditModel = {
      GeoHazardTID: geoHazard,
      RegistrationTID: registrationTid,
      AttachmentMimeType: mimeType,
      id: attachmentId,
      type,
      fileSize: statResult.size,
      fileName: attachmentFileName,
      fileAddedTime: Date.now(),
      ref,
    };

    this.logger.debug(`Attachment copied from ${fileNameWithFullPath} to ${result.uri}`, this.DEBUG_TAG, metadata);
    await firstValueFrom(this.saveAttachmentMeta$(registrationId, metadata));
  }

  async addAttachment(
    registrationId: string,
    data: Blob,
    mimeType: string,
    geoHazard: GeoHazard,
    registrationTid: RegistrationTid,
    type: AttachmentType = 'Attachment',
    ref?: string
  ): Promise<void> {
    throw new Error('Ikke implementert, fordi vi bruker ikke funksjonen i app');
  }

  saveAttachmentMeta$(registrationId: string, meta: AttachmentUploadEditModel): Observable<unknown> {
    const path = `${this.getFolderPath(registrationId)}/${this.getMetadataFileName(meta.id)}`;
    return from(
      Filesystem.writeFile({
        path: path,
        data: JSON.stringify(meta),
        directory: Directory.Data,
        encoding: Encoding.UTF8,
        recursive: true,
      })
    ).pipe(tap(() => this.attachmentsChanged.next()));
  }

  protected getAttachmentsObservable(registrationId: string): Observable<AttachmentUploadEditModel[]> {
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
    const path = await this.getFolderPath(registrationId);
    await Filesystem.rmdir({ path: path, directory: Directory.Data, recursive: true });
    this.attachmentsChanged.next();
  }

  removeAttachments$(registrationId: string): Observable<void> {
    return from(this.removeAttachments(registrationId));
  }

  private async getAttachmentsFromFile(registrationId: string): Promise<AttachmentUploadEditModel[]> {
    const path = await this.getFolderPath(registrationId);
    if (await this.directoryForRegistrationExists(registrationId)) {
      const readDirResult = await Filesystem.readdir({ path, directory: Directory.Data });
      const fileEntries: FileInfo[] = readDirResult.files;
      return await Promise.all(
        fileEntries
          .filter((entry) => entry.type === 'file' && entry.name.endsWith('.json'))
          .map((entry) => this.readMetadataFile(registrationId, entry.name))
      );
    }
    return [];
  }

  private async readMetadataFile(registrationId: string, filename: string): Promise<AttachmentUploadEditModel> {
    const registrationFolder = await this.getFolderPath(registrationId);
    if (!(await this.directoryForRegistrationExists(registrationId))) {
      throw Error(`Directory for registration ${registrationFolder}/${registrationId} does not exist`);
    }
    const path = `${registrationFolder}/${registrationId}/${filename}`;
    const fileResult = await Filesystem.readFile({
      path,
      encoding: Encoding.UTF8,
    });
    const content: string = fileResult.data as string;
    this.logger.debug(`Read metadata file ${path}`, this.DEBUG_TAG, { content });
    return JSON.parse(content);
  }

  private async getBlobInternal(registrationId: string, attachmentId: string): Promise<Blob> {
    const nativePath = await this.getImageFilePath(registrationId, attachmentId);
    const webPath = Capacitor.convertFileSrc(nativePath);
    const response = await fetch(webPath);
    return response.blob();
  }

  private async getImageFilePath(registrationId: string, attachmentId: string): Promise<string> {
    const path = this.getFolderPath(registrationId);
    const metadata = await this.readMetadataFile(registrationId, `${attachmentId}.json`);
    if (!metadata.fileName) {
      throw new Error('No image filename in metadata file');
    }
    return `${path}/${metadata.fileName}`;
  }

  private async removeAttachmentInternal(registrationId: string, attachmentId: string): Promise<boolean> {
    const path = await this.getFolderPath(registrationId);
    const metadataFileName = this.getMetadataFileName(attachmentId);
    const imageFilePath = await this.getImageFilePath(registrationId, attachmentId);

    if (imageFilePath) {
      await Filesystem.deleteFile({ path: `${imageFilePath}`, directory: Directory.Data });
    }
    await Filesystem.deleteFile({ path: `${path}/${metadataFileName}`, directory: Directory.Data });

    const remainingEntries = await Filesystem.readdir({ path: path, directory: Directory.Data });
    if (remainingEntries.files.length === 0) {
      await Filesystem.rmdir({ path: path, directory: Directory.Data, recursive: true });
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
    const path = await this.getFolderPath(registrationId);
    try {
      await Filesystem.readdir({ path, directory: Directory.Data });
      return true;
    } catch (err) {
      return false;
    }
  }
}
