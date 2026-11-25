import { GeoHazard } from 'src/app/modules/common-core/models';
import { uuidv4 } from 'src/app/modules/common-core/helpers';
import { BehaviorSubject, firstValueFrom, from, Observable, switchMap, tap } from 'rxjs';
import { AttachmentType, AttachmentUploadEditModel } from '../../models/attachment-upload-edit.interface';
import { RegistrationTid } from '../../registration.models';
import { NewAttachmentService } from './new-attachment.service';
import { inject, Injectable, InjectionToken } from '@angular/core';
import { Directory, Encoding, FileInfo, Filesystem, FilesystemPlugin, MkdirOptions } from '@capacitor/filesystem';
import { Capacitor } from '@capacitor/core';
import { LogLevel } from 'src/app/modules/shared/services/logging/log-level.model';
import { deleteFile } from 'src/app/utils/file-utils';

const ROOT_DIR = 'attachments';

/** Capacitor Filesystem-pluginen, som egen token slik at den kan byttes ut i tester */
export const FILESYSTEM = new InjectionToken<FilesystemPlugin>('Capacitor Filesystem', {
  providedIn: 'root',
  factory: () => Filesystem,
});

/** Feilkoden Capacitor Filesystem gir på iOS og Android når mappa vi prøver å opprette allerede finnes */
const DIRECTORY_ALREADY_EXISTS_CODE = 'OS-PLUG-FILE-0010';

const isDirectoryAlreadyExistsError = (err: unknown): boolean => {
  if (typeof err !== 'object' || err === null) {
    return false;
  }
  const { code, message } = err as { code?: unknown; message?: unknown };
  return code === DIRECTORY_ALREADY_EXISTS_CODE || (typeof message === 'string' && message.includes('already exists'));
};

/**
 * Tilbyr mellomlagring av bilder til en observasjon på lokal disk. Bruker native funksjoner via Capacitor Filesystem API.
 * Alle bilder lagres i mappa "attachments" i appens data-mappe.
 * Bildene lagres i en egen mappe for hver observasjon, og metadata lagres i en json-fil med samme navn som bildet.
 */
@Injectable()
export default class FileAttachmentService extends NewAttachmentService {
  protected override DEBUG_TAG = 'FileAttachmentService';
  private attachmentsChanged = new BehaviorSubject<void>(undefined); //get a tick each time an attachment changes
  private rootFileUrl?: Promise<string>;
  private filesystem = inject(FILESYSTEM);
  private folderCreations = new Map<string, Promise<void>>();

  constructor() {
    super();
    this.attachmentsChanged.pipe(tap(() => this.logger.debug('Attachments changed', this.DEBUG_TAG)));
  }

  /**
   * @returns sti til mappa vi lagrer vedleggene i for alle registreringer, uten / på slutten
   */
  private getRootFileUrl(): Promise<string> {
    // Del samme promise mellom samtidige kall, så vi ikke prøver å opprette mappa flere ganger
    if (!this.rootFileUrl) {
      this.rootFileUrl = this.createRootFolder().catch((err) => {
        this.rootFileUrl = undefined; // prøv på nytt neste gang
        this.logger.error(err, this.DEBUG_TAG, `Error getting root directory url ${ROOT_DIR}`);
        throw err;
      });
    }
    return this.rootFileUrl;
  }

  private async createRootFolder(): Promise<string> {
    const dataDirectory = Directory.Data;
    const readDirResult = await this.filesystem.readdir({
      path: '',
      directory: dataDirectory,
    });
    if (readDirResult.files.filter((fileInfo) => fileInfo.name === ROOT_DIR).length === 0) {
      //no root folder yet, so create it
      await this.mkdirIfMissing({
        path: ROOT_DIR,
        directory: dataDirectory,
      });
    }
    const { uri } = await this.filesystem.getUri({ path: ROOT_DIR, directory: dataDirectory });
    return uri.endsWith('/') ? uri.slice(0, -1) : uri;
  }

  /**
   * @returns sti til mappa vi lagrer vedleggene i for angitt registrering, uten / på slutten
   */
  private async getFolderPath(registrationId: string): Promise<string> {
    const rootFileUrl = await this.getRootFileUrl();
    const folderPath = `${rootFileUrl}/${registrationId}`;
    try {
      await this.ensureRegistrationFolder(rootFileUrl, registrationId, folderPath);
    } catch (err) {
      this.logger.error(err, this.DEBUG_TAG, `Error reading or creating directory ${folderPath}`);
    }
    return folderPath;
  }

  /**
   * Samtidige kall for samme mappe deler samme promise, så mappa bare opprettes én gang.
   * Vi husker ikke mappa etter at den er opprettet, fordi den kan slettes igjen (f.eks. i removeAttachments).
   */
  private ensureRegistrationFolder(rootFileUrl: string, registrationId: string, folderPath: string): Promise<void> {
    let creation = this.folderCreations.get(folderPath);
    if (!creation) {
      creation = this.createRegistrationFolder(rootFileUrl, registrationId, folderPath).finally(() =>
        this.folderCreations.delete(folderPath)
      );
      this.folderCreations.set(folderPath, creation);
    }
    return creation;
  }

  private async createRegistrationFolder(rootFileUrl: string, registrationId: string, folderPath: string) {
    const readDirResult = await this.filesystem.readdir({
      path: rootFileUrl,
    });

    // sjekk om mappa for registrering allerede finnes
    if (readDirResult.files.filter((fileInfo) => fileInfo.name === registrationId).length === 0) {
      //opprett mappa for registreringa hvis den ikke finnes
      await this.mkdirIfMissing({
        path: folderPath,
      });
    }
  }

  /** Oppretter mappa. Hvis den allerede finnes, regner vi det som vellykket. */
  private async mkdirIfMissing(options: MkdirOptions): Promise<void> {
    try {
      await this.filesystem.mkdir(options);
    } catch (err) {
      if (!isDirectoryAlreadyExistsError(err)) {
        throw err;
      }
      this.logger.debug(`Directory ${options.path} already exists`, this.DEBUG_TAG);
    }
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
      const result = await this.filesystem.copy({
        from: `${fileNameWithFullPath}`,
        to: `${destinationPath}/${attachmentFileName}`,
      });
      const statResult = await this.filesystem.stat({ path: `${result.uri}` });
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
    await this.filesystem.writeFile({
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
    await this.filesystem.rmdir({ path: path, recursive: true });
    this.attachmentsChanged.next();
  }

  removeAttachments$(registrationId: string): Observable<void> {
    return from(this.removeAttachments(registrationId));
  }

  /** Henter metadata for alle vedlegg til angitt observasjon */
  private async getAttachmentsFromFile(registrationId: string): Promise<AttachmentUploadEditModel[]> {
    const path = await this.getFolderPath(registrationId);
    try {
      const readDirResult = await this.filesystem.readdir({ path });
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
      const fileResult = await this.filesystem.readFile({
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
    // samme sti og samme filsystem som vi lagret vedleggene med
    let rootFileUrl: string;
    try {
      rootFileUrl = await this.getRootFileUrl();
    } catch {
      return false; // getRootFileUrl har allerede logget feilen, og removeAttachment() abonnerer uten feilhåndtering
    }
    const path = `${rootFileUrl}/${registrationId}`;
    const metadataFileName = this.getMetadataFileName(attachmentId);
    const imageFilePath = await this.getImageFilePath(registrationId, attachmentId);

    if (imageFilePath) {
      await deleteFile(imageFilePath, this.logger, this.filesystem);
    }
    await deleteFile(`${path}/${metadataFileName}`, this.logger, this.filesystem);

    // slett vedlegg-mappa for denne observasjonen hvis det ikke er flere vedlegg igjen
    try {
      const remainingEntries = await this.filesystem.readdir({ path, directory: Directory.Data });
      if (remainingEntries.files.length === 0) {
        await this.filesystem.rmdir({ path: path, directory: Directory.Data });
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
