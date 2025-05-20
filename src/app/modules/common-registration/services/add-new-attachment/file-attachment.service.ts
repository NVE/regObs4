import { GeoHazard } from 'src/app/modules/common-core/models';
import { uuidv4 } from 'src/app/modules/common-core/helpers';
import { BehaviorSubject, firstValueFrom, from, Observable, switchMap, tap } from 'rxjs';
import { AttachmentType, AttachmentUploadEditModel } from '../../models/attachment-upload-edit.interface';
import { RegistrationTid } from '../../registration.models';
import { NewAttachmentService } from './new-attachment.service';
import { Injectable } from '@angular/core';
import { Directory, Encoding, FileInfo, Filesystem } from '@capacitor/filesystem';
import { Capacitor } from '@capacitor/core';
import { LogLevel } from 'src/app/modules/shared/services/logging/log-level.model';

const ROOT_DIR = 'attachments';

/**
 * Tilbyr mellomlagring av bilder til en observasjon på lokal disk. Bruker native funksjoner via Capacitor Filesystem API.
 * Alle bilder lagres i mappa "attachments" i appens data-mappe.
 * Bildene lagres i en egen mappe for hver observasjon, og metadata lagres i en json-fil med samme navn som bildet.
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
   * @returns true hvis angitt fil eller mappe finnes. Du må bruke full sti til filen eller mappa
   */
  async doesFileOrDirectoryExist(path: string): Promise<boolean> {
    const name = path.split('/').pop();
    const directory = path.split('/').slice(0, -1).join('/');
    try {
      const readDirResult = await Filesystem.readdir({
        path: directory,
      });
      if (readDirResult.files.filter((fileInfo) => fileInfo.name === name).length > 0) {
        return true;
      }
    } catch (err) {
      this.logger.log(`Error checking if file or directory exists: ${path}`, err, LogLevel.Debug, this.DEBUG_TAG);
    }
    return false;
  }

  async deleteFile(path: string): Promise<void> {
    if (await this.doesFileOrDirectoryExist(path)) {
      try {
        await Filesystem.deleteFile({ path });
        this.logger.debug(`Deleted file ${path}`, this.DEBUG_TAG);
      } catch (err) {
        this.logger.log(`Error deleting file ${path}`, err, LogLevel.Debug, this.DEBUG_TAG);
      }
    } else {
      this.logger.debug(`File ${path} does not exist, so cannot be deleted`, this.DEBUG_TAG);
    }
  }

  /**
   * Gjør om angitt filsti til en URI som kan brukes i nettleser
   * @param path sti til fila, relativ til appens data-mappe
   */
  async getUri(path: string): Promise<string> {
    try {
      const uriResult = await Filesystem.getUri({
        path: path,
        directory: Directory.Data,
      });
      const uri = uriResult.uri;
      if (uri.endsWith('/')) {
        return uri.slice(0, -1);
      }
      return uri;
    } catch (err) {
      this.logger.log(`Error getting URI for path ${path}`, err, LogLevel.Debug, this.DEBUG_TAG);
    }
    return '';
  }

  /**
   * @returns sti til mappa vi lagrer vedleggene i for alle registreringer, uten / på slutten
   */
  private async getRootFileUrl(): Promise<string> {
    if (this.rootFileUrl === '') {
      const dataDirectory = Directory.Data;
      try {
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
        this.rootFileUrl = await this.getUri(ROOT_DIR);
      } catch (err) {
        this.logger.error(err, this.DEBUG_TAG, `Error getting root directory url ${ROOT_DIR}`);
        throw err;
      }
    }
    return this.rootFileUrl;
  }

  /**
   * @returns sti til mappa vi lagrer vedleggene i for angitt registrering, uten / på slutten
   */
  private async getFolderPath(registrationId: string): Promise<string> {
    const rootFileUrl = await this.getRootFileUrl();
    const folderPath = `${rootFileUrl}/${registrationId}`;
    try {
      const readDirResult = await Filesystem.readdir({
        path: rootFileUrl,
      });

      // sjekk om mappa for registrering allerede finnes
      if (readDirResult.files.filter((fileInfo) => fileInfo.name === registrationId).length === 0) {
        //opprett mappa for registreringa hvis den ikke finnes
        await Filesystem.mkdir({
          path: folderPath,
        });
      }
    } catch (err) {
      this.logger.error(err, this.DEBUG_TAG, `Error reading og creating directory ${folderPath}`);
    }
    return folderPath;
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
    try {
      // TODO: Kunne vi la være å kopiere fila og heller laste den opp fra der OS'et legger den?
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
    } catch (err) {
      this.logger.error(
        err,
        this.DEBUG_TAG,
        `Error copying file from ${fileNameWithFullPath} to ${destinationPath}/${attachmentFileName}`
      );
    }
  }

  async addAttachment(
    registrationId: string,
    data: Blob,
    mimeType: string,
    geoHazard: GeoHazard,
    registrationTid: RegistrationTid,
    _type: AttachmentType = 'Attachment',
    _ref?: string
  ): Promise<void> {
    throw new Error('Ikke implementert, fordi vi bruker ikke funksjonen i app');
  }

  saveAttachmentMeta$(registrationId: string, meta: AttachmentUploadEditModel): Observable<unknown> {
    return from(this.saveAttachmentMeta(registrationId, meta));
  }

  private async saveAttachmentMeta(registrationId: string, meta: AttachmentUploadEditModel) {
    const folderPath = await this.getFolderPath(registrationId);
    const filePath = `${folderPath}/${this.getMetadataFileName(meta.id)}`;
    await Filesystem.writeFile({
      path: filePath,
      data: JSON.stringify(meta),
      encoding: Encoding.UTF8,
      recursive: true,
    });
    this.attachmentsChanged.next();
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
    await Filesystem.rmdir({ path: path, recursive: true });
    this.attachmentsChanged.next();
  }

  removeAttachments$(registrationId: string): Observable<void> {
    return from(this.removeAttachments(registrationId));
  }

  /** Henter metadata for alle vedlegg til angitt observasjon */
  private async getAttachmentsFromFile(registrationId: string): Promise<AttachmentUploadEditModel[]> {
    const path = await this.getFolderPath(registrationId);
    try {
      const readDirResult = await Filesystem.readdir({ path });
      const fileEntries: FileInfo[] = readDirResult.files;
      const metadatas = await Promise.all(
        fileEntries
          .filter((entry) => entry.type === 'file' && entry.name.endsWith('.json'))
          .map((entry) => this.readMetadataFile(registrationId, entry.name))
      );
      return metadatas.filter((metadata) => metadata !== null); //fjern filer vi ikke greide å lese
    } catch (err) {
      this.logger.error(err, this.DEBUG_TAG, `Error reading directory ${path}`);
      return [];
    }
  }

  private async readMetadataFile(registrationId: string, filename: string): Promise<AttachmentUploadEditModel | null> {
    const registrationFolder = await this.getFolderPath(registrationId);
    const path = `${registrationFolder}/${filename}`;
    try {
      const fileResult = await Filesystem.readFile({
        path,
        encoding: Encoding.UTF8,
      });
      const content: string = fileResult.data as string;
      return JSON.parse(content);
    } catch (err) {
      this.logger.error(err, this.DEBUG_TAG, `Error reading metadata file ${path}`);
      return null;
    }
  }

  private async getBlobInternal(registrationId: string, attachmentId: string): Promise<Blob> {
    try {
      const nativePath = await this.getImageFilePath(registrationId, attachmentId);
      if (nativePath) {
        const webPath = Capacitor.convertFileSrc(nativePath);
        const response = await fetch(webPath);
        return response.blob();
      }
    } catch (err) {
      this.logger.error(err, this.DEBUG_TAG, `Error getting blob for attachment ${attachmentId}`);
    }
    return new Blob(); //TODO: Funker det å returnere tom blob hvis vi ikke finner fila?
  }

  private async getImageFilePath(registrationId: string, attachmentId: string): Promise<string | null> {
    const path = await this.getFolderPath(registrationId);
    try {
      const metadata = await this.readMetadataFile(registrationId, `${attachmentId}.json`);
      if (metadata?.fileName) {
        return `${path}/${metadata.fileName}`;
      }
    } catch (err) {
      this.logger.error(err, this.DEBUG_TAG, `Error getting image file path for attachment ${attachmentId}`);
    }
    return null;
  }

  private async removeAttachmentInternal(registrationId: string, attachmentId: string): Promise<boolean> {
    const path = await this.getUri(ROOT_DIR + '/' + registrationId);
    const metadataFileName = this.getMetadataFileName(attachmentId);
    const imageFilePath = await this.getImageFilePath(registrationId, attachmentId);

    if (imageFilePath) {
      await this.deleteFile(imageFilePath);
    }
    await this.deleteFile(`${path}/${metadataFileName}`);

    // slett vedlegg-mappa for denne observasjonen hvis det ikke er flere vedlegg igjen
    try {
      const remainingEntries = await Filesystem.readdir({ path, directory: Directory.Data });
      if (remainingEntries.files.length === 0) {
        await Filesystem.rmdir({ path: path, directory: Directory.Data });
        this.logger.debug(`Removed empty directory ${path}`, this.DEBUG_TAG);
      }
    } catch (err) {
      this.logger.log(`Error removing empty directory ${path}`, err, LogLevel.Warning, this.DEBUG_TAG);
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
}
