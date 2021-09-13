import { Injectable } from '@angular/core';
import { AppModeService, GeoHazard, LoggerService, uuidv4 } from '@varsom-regobs-common/core';
import { AttachmentType, AttachmentUploadEditModel, NewAttachmentService, OfflineDbNewAttachmentService, OfflineDbService, RegistrationTid } from '@varsom-regobs-common/registration';
import { File, Metadata, Entry } from '@ionic-native/file/ngx';
import { Observable } from 'rxjs';

const ATTACHMENT_DIR_NAME = "attachments";

@Injectable({
  providedIn: 'root'
})
export class AttachmentService extends OfflineDbNewAttachmentService {

  private hasCreatedRootFolder = false;

  constructor(
    private file: File,
    offlineDbService: OfflineDbService,
    appModeService: AppModeService,
    loggerService: LoggerService
  ) {
    super(offlineDbService, appModeService, loggerService);
  }

  addAttachment(registrationId: string, data: Blob, mimeType: string, geoHazard: GeoHazard, registrationTid: RegistrationTid, type?: AttachmentType, ref?: string): void {
    const attachmentId = uuidv4();
    this.getRegistrationOfflineDocumentById(registrationId).pipe(take(1), switchMap((doc) =>
      this.saveAttachmentMeta$({
        id: attachmentId,
        AttachmentMimeType: mimeType,
        GeoHazardTID: geoHazard,
        RegistrationTID: registrationTid,
        type,
        ref,
        fileSize: data.size,
      }).pipe(switchMap(() => from(doc.putAttachment({
        id: attachmentId,
        data,
        type: mimeType
      }
      ))))), catchError((err) => {
      this.loggerService.error(() => 'Could not add attachment', err);
      return EMPTY;
    })).subscribe();
  }

  private async getDataDirectoryFileUrl(): Promise<string> {
    if(this.file && this.file.dataDirectory) {
      return this.file.dataDirectory;
    }
    return undefined;
  }

  private async getRootDirName(): Promise<string> {
    if(!this.hasCreatedRootFolder) {
      const dataFolder = await this.getDataDirectoryFileUrl();
      await this.file.createDir(dataFolder, ATTACHMENT_DIR_NAME, true);
      this.hasCreatedRootFolder = true;
    }
    return ATTACHMENT_DIR_NAME;
  }
}
