import { ItemSyncCallbackService } from './item-sync-callback.service';
import { IRegistration } from '../../models/registration.interface';
import { Observable, of, forkJoin } from 'rxjs';
import { Injectable } from '@angular/core';
import { ItemSyncCompleteStatus } from '../../models/item-sync-complete-status.interface';
import { AttachmentEditModel, RegistrationViewModel } from 'src/app/modules/common-regobs-api/models';
import { RegistrationService, AttachmentService as ApiAttachmentService } from 'src/app/modules/common-regobs-api/services';
import { map, catchError, switchMap, tap, filter, take } from 'rxjs/operators';
import { LangKey } from 'src/app/modules/common-core/models';
import { LanguageService } from 'src/app/modules/common-core/services';
import { AttachmentUploadEditModel } from '../../models/attachment-upload-edit.interface';
import { HttpClient, HttpEventType, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ProgressService } from '../progress/progress.service';
import { NewAttachmentService } from '../add-new-attachment/new-attachment.service';
import { WaterLevelMeasurementUploadModel } from '../../models/water-level-measurement-upload-model';
import cloneDeep from 'clone-deep';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';
import { LogLevel } from 'src/app/modules/shared/services/logging/log-level.model';

const DEBUG_TAG = 'RegobsApiSyncCallbackService';

@Injectable()
export class RegobsApiSyncCallbackService implements ItemSyncCallbackService<IRegistration> {
  constructor(
    private regobsApiRegistrationService: RegistrationService,
    private languageService: LanguageService,
    private apiAttachmentService: ApiAttachmentService,
    private newAttachmentService: NewAttachmentService,
    private loggingService: LoggingService,
    private httpClient: HttpClient,
    private progressService: ProgressService
  ) {}

  deleteItem(item: IRegistration): Observable<boolean> {
    if (!item || !item.response || !(item.response.RegId > 0)) {
      return of(false);
    }
    return this.regobsApiRegistrationService.RegistrationDelete(item.response.RegId).pipe(map(() => true));
  }

  syncItem(item: IRegistration, ignoreVersionCheck: boolean): Observable<ItemSyncCompleteStatus<IRegistration>> {
    return this.languageService.language$.pipe(
      take(1),
      switchMap((langKey) => this.insertOrUpdate(item, langKey, ignoreVersionCheck))
    );
  }

  insertOrUpdate(item: IRegistration, langKey: LangKey, ignoreVersionCheck: boolean): Observable<ItemSyncCompleteStatus<IRegistration>> {
    this.loggingService.debug('Start insertOrUpdate: ', DEBUG_TAG, item, langKey);
    return this.uploadAttachments(item).pipe(
      switchMap((uploadAttachmentResult) => {
        this.loggingService.debug('Result from attachment upload: ', DEBUG_TAG, uploadAttachmentResult);
        this.loggingService.debug('Registration is now: ', DEBUG_TAG, item);
        const uploadSuccess = !uploadAttachmentResult.some((a) => a.error);
        let attachmentStatusCode: number = undefined;
        if (!uploadSuccess) {
          attachmentStatusCode = uploadAttachmentResult
            .map((a) => (a.error as HttpErrorResponse).status || 0)
            .reduce((pv, cv) => (cv > pv ? cv : pv), 0);
        }
        // Set request attachments on temporary request item, so it will not be removed / invalid if failure
        const clonedItem = cloneDeep(item);
        this.setRequestAttachments(clonedItem, uploadAttachmentResult);
        return (
          this.callInsertOrUpdate(clonedItem, langKey, ignoreVersionCheck)
            // TODO: Hvorfor removeAllNewAttachments her?
            .pipe(
              switchMap((result) => this.removeAllNewAttachments(clonedItem).pipe(map(() => result))),
              map((result) => ({
                success: uploadSuccess,
                item: { ...cloneDeep(item), response: result },
                statusCode: attachmentStatusCode,
                error: uploadSuccess ? undefined : 'Could not upload attachments'
              })),
              catchError((err: HttpErrorResponse) => {
                const errorMsg = this.getErrorModelStateMessageOrErrorMsg(err);
                return of({ success: false, item: item, statusCode: err.status, error: errorMsg });
              })
            )
        );
      })
    );
  }

  private getErrorModelStateMessageOrErrorMsg(err: HttpErrorResponse): string {
    if (err && err.error) {
      return JSON.stringify(err.error);
    }
    if (err && err.message) {
      return err.message;
    }
    return 'Unknown error';
  }

  /**
   * Add uploaded attachments with uploadId to request attachments
   **/
  private setRequestAttachments(reg: IRegistration, uploadedAttachments: AttachmentUploadEditModel[]) {
    if (uploadedAttachments && uploadedAttachments.length > 0) {
      for (const uploadedAttachment of uploadedAttachments) {
        if (uploadedAttachment.AttachmentUploadId) {
          // Only set request attachments with uploadId
          this.addUploadedAttachmentToRequest(uploadedAttachment, reg);
        }
      }
    }
  }

  private callInsertOrUpdate(item: IRegistration, langKey: LangKey, ignoreVersionCheck?: boolean): Observable<RegistrationViewModel> {
    // TODO: Hvorfor trenger vi både RegistrationInsertOrUpdate og RegistrationInsert?
    // Kunne vi bare brukt InsertOrUpdate hver gang?
    return item.response
      ? // PUT
      this.regobsApiRegistrationService.RegistrationInsertOrUpdate({
        registration: item.request,
        id: item.response.RegId,
        langKey,
        externalReferenceId: item.id,
        ignoreVersionCheck: ignoreVersionCheck
      })
      : // POST
      this.regobsApiRegistrationService.RegistrationInsert({
        registration: item.request,
        langKey,
        externalReferenceId: item.id
      });
  }

  removeAllNewAttachments(item: IRegistration): Observable<IRegistration> {
    return this.newAttachmentService.removeAttachments$(item.id).pipe(map(() => item));
  }

  uploadAttachments(item: IRegistration): Observable<AttachmentUploadEditModel[]> {
    return this.getAttachmentsToUpload(item).pipe(
      take(1),
      switchMap((attachmentsToUpload) => {
        if (attachmentsToUpload.length > 0) {
          this.loggingService.debug('Attachments to upload: ', DEBUG_TAG, attachmentsToUpload);
          return forkJoin(attachmentsToUpload.map((a) => this.uploadAttachmentAndSetAttachmentUploadId(item, a).pipe(take(1))));
        }
        this.loggingService.debug('No attachments to uplaod');
        return of([]);
      })
    );
  }

  uploadAttachmentAndSetAttachmentUploadId(
    reg: IRegistration,
    attachmentUpload: AttachmentUploadEditModel
  ): Observable<AttachmentUploadEditModel> {
    attachmentUpload.error = undefined;
    return this.newAttachmentService.getBlob(reg.id, attachmentUpload.id).pipe(
      switchMap((blob) =>
        this.uploadAttachmentWithProgress(attachmentUpload.id, blob).pipe(
          switchMap((uploadId) => {
            this.loggingService.debug('Attachment uploaded. Setting uploadId', DEBUG_TAG, attachmentUpload, uploadId);
            // this.addAttachmentToRequest(uploadId, attachmentUpload, reg);
            attachmentUpload.AttachmentUploadId = uploadId;
            return this.newAttachmentService.saveAttachmentMeta$(reg.id, attachmentUpload).pipe(map(() => attachmentUpload));
          })
        )
      ),
      catchError((err: Error) => {
        this.loggingService.log('Could not upload attachment. Setting error.', err, LogLevel.Debug, DEBUG_TAG);
        attachmentUpload.error = err;
        return of(attachmentUpload);
      })
    );
  }

  private addUploadedAttachmentToRequest(attachmentUploadEditModel: AttachmentUploadEditModel, reg: IRegistration) {
    const attachment = {
      AttachmentUploadId: attachmentUploadEditModel.AttachmentUploadId,
      Photographer: attachmentUploadEditModel.Photographer,
      Copyright: attachmentUploadEditModel.Copyright,
      Aspect: attachmentUploadEditModel.Aspect,
      GeoHazardTID: attachmentUploadEditModel.GeoHazardTID,
      RegistrationTID: attachmentUploadEditModel.RegistrationTID,
      Comment: attachmentUploadEditModel.Comment,
      AttachmentMimeType: attachmentUploadEditModel.AttachmentMimeType,
      IsMainAttachment: attachmentUploadEditModel.IsMainAttachment
    };
    if (attachmentUploadEditModel.type === 'WaterLevelMeasurementAttachment') {
      this.addWaterLevelAttachment(attachment, reg, attachmentUploadEditModel.ref);
      return;
    }
    if (attachmentUploadEditModel.type === 'DamageObsAttachment') {
      this.addDamageObsAttachment(attachment, reg, attachmentUploadEditModel.ref);
      return;
    }
    if (!reg.request.Attachments) {
      reg.request.Attachments = [];
    }
    reg.request.Attachments.push(attachment);
  }

  private addDamageObsAttachment(attachment: AttachmentEditModel, reg: IRegistration, ref: string) {
    throw new Error('Uploading of damage obs attachments not implemented');
  }

  private addWaterLevelAttachment(attachment: AttachmentEditModel, reg: IRegistration, ref: string) {
    const predicate = (m: WaterLevelMeasurementUploadModel) => m.ref === ref;
    const measurement = reg.request.WaterLevel2.WaterLevelMeasurement.find(predicate);
    if (!measurement) {
      this.loggingService.log(`Did not find measurement for attachment with ref ${ref}`, null, LogLevel.Error, DEBUG_TAG, attachment, reg, ref);
    }
    if (!measurement.Attachments) {
      measurement.Attachments = [];
    }
    measurement.Attachments.push(attachment);
  }

  getAttachmentsToUpload(item: IRegistration): Observable<AttachmentUploadEditModel[]> {
    return this.newAttachmentService.getAttachments(item.id);
  }

  uploadAttachmentWithProgress(id: string, blob: Blob): Observable<string> {
    const attachmentPostPath = `${this.apiAttachmentService.rootUrl}${ApiAttachmentService.AttachmentPostPath}`;
    const formData = new FormData();
    formData.append('file', blob);
    return this.httpClient
      .post(attachmentPostPath, formData, {
        responseType: 'json',
        reportProgress: true,
        observe: 'events',
        headers: { 'ngsw-bypass': '' }
      })
      .pipe(
        tap((event) => {
          this.loggingService.debug('uploadAttachmentWithProgress got event:', DEBUG_TAG, event);
          if (event.type === HttpEventType.UploadProgress) {
            this.progressService.setAttachmentProgress(id, event.total, event.loaded);
          }
        }),
        filter((event) => event.type === HttpEventType.Response),
        map((event: HttpResponse<string>) => {
          if (!event.ok) {
            throw Error(`Could not upload attachment: Status: ${event.statusText}`);
          }
          return event.body;
        }),
        tap((result) => this.loggingService.debug(`Attachment uploaded with attachment id: ${result} `))
      );
  }
}
