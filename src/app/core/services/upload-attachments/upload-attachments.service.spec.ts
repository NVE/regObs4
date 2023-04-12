import { HttpErrorResponse, HttpEventType, HttpResponse } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import cloneDeep from 'clone-deep';
import { Observable, of } from 'rxjs';
import { AttachmentUploadEditModel, SyncStatus } from 'src/app/modules/common-registration/registration.models';
import { NewAttachmentService } from 'src/app/modules/common-registration/registration.services';
import { DateHelperService } from 'src/app/modules/shared/services/date-helper/date-helper.service';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';
import { RegistrationDraft } from '../draft/draft-model';
import { UserSettingService } from '../user-setting/user-setting.service';
import { UploadAttachmentsService } from './upload-attachments.service';
import { UploadSingleAttachmentService } from './upload-single-attachment.service';

describe('UploadAttachmentsService', () => {
  let service: UploadAttachmentsService;

  it('should not upload attachments with AttachmentUploadId (already uploaded)', async () => {
    const httpClient = jasmine.createSpyObj('HttpClient', ['post']);

    // List of fake attachments that fake newAttachmentsService will return
    const fakeAttachments: AttachmentUploadEditModel[] = [
      { id: '1234', type: 'Attachment', AttachmentUploadId: '1234' },
      { id: '5678', type: 'Attachment', AttachmentUploadId: '5678' },
    ];

    const fakeAttachmentsCopy = cloneDeep(fakeAttachments);

    const newAttachmentService = {
      getAttachments: (): Observable<AttachmentUploadEditModel[]> => {
        return of(fakeAttachments);
      },
    };

    service = new UploadAttachmentsService(
      newAttachmentService as unknown as NewAttachmentService,
      {} as UploadSingleAttachmentService,
      {} as TranslateService,
      {} as DateHelperService,
      {} as LoggingService,
      {
        userSetting$: of({}),
      } as UserSettingService,
      {} as AlertController
    );

    const draft: RegistrationDraft = {
      uuid: '12345-abc',
      syncStatus: SyncStatus.Sync,
      simpleMode: false,
      registration: {
        GeoHazardTID: 10,
        DtObsTime: 'test',
      },
    };

    const result = await service.uploadAllAttachments(draft);

    // Test that post is not called at all
    expect(httpClient.post.calls.any()).toBe(false);
    // Test that uploadAllAttachments just returns the attachments,
    // as they are already uploaded
    expect(result).toEqual(fakeAttachmentsCopy);
  });

  it('should upload attachments for attachments without AttachmentUploadId', async () => {
    const httpClient = jasmine.createSpyObj('HttpClient', ['post']);
    const responseAttachmentUploadId = '12345-test-id';

    httpClient.post.and.returnValue(
      of(
        {
          type: HttpEventType.UploadProgress,
          loaded: 500,
          total: 1000,
        },
        {
          type: HttpEventType.UploadProgress,
          loaded: 1000,
          total: 1000,
        },
        new HttpResponse({ body: responseAttachmentUploadId })
      )
    );

    const fakeAttachments: AttachmentUploadEditModel[] = [
      { id: '1234', type: 'Attachment', AttachmentUploadId: '1234' },
      { id: '5678', type: 'Attachment' }, // This attachment has no AttachmentUploadId and should be uploaded
    ];

    const addAttachmentsResult: AttachmentUploadEditModel[] = [
      { id: '1234', type: 'Attachment', AttachmentUploadId: '1234' },
      { id: '5678', type: 'Attachment', AttachmentUploadId: responseAttachmentUploadId },
    ];

    const saveAttachmentMeta$ = jasmine.createSpy();
    saveAttachmentMeta$.and.returnValue(of(true));

    const newAttachmentService = {
      getAttachments: (): Observable<AttachmentUploadEditModel[]> => {
        return of(fakeAttachments);
      },
      getBlob: (): Observable<Blob> => {
        return of(new Blob(['test'], { type: 'image/png' }));
      },
      saveAttachmentMeta$: saveAttachmentMeta$,
    };

    service = new UploadAttachmentsService(
      newAttachmentService as unknown as NewAttachmentService,
      {} as UploadSingleAttachmentService,
      {} as TranslateService,
      {} as DateHelperService,
      jasmine.createSpyObj('LoggingService', ['debug']),
      {
        userSetting$: of({}),
      } as UserSettingService,
      {} as AlertController
    );

    const draft: RegistrationDraft = {
      uuid: '12345-abc',
      syncStatus: SyncStatus.Sync,
      simpleMode: false,
      registration: {
        GeoHazardTID: 10,
        DtObsTime: 'test',
      },
    };

    const result = await service.uploadAllAttachments(draft);

    // Test that we call post one time as we have one image to upload
    expect(httpClient.post).toHaveBeenCalledTimes(1);

    // Test that uploadAllAttachments just returns the attachments,
    // as they are already uploaded
    expect(result).toEqual(addAttachmentsResult);
  });

  it('should return failed attachment upload as undefined', async () => {
    const httpClient = jasmine.createSpyObj('HttpClient', ['post']);
    const responseAttachmentUploadId = '12345-test-id';

    httpClient.post.and.returnValues(
      of(
        {
          type: HttpEventType.UploadProgress,
          loaded: 500,
          total: 1000,
        },
        {
          type: HttpEventType.UploadProgress,
          loaded: 1000,
          total: 1000,
        },
        new HttpResponse({ body: responseAttachmentUploadId })
      ),
      // Second upload will fail, it starts to upload, but gets a server error
      of(
        {
          type: HttpEventType.UploadProgress,
          loaded: 200,
          total: 1000,
        },
        {
          type: HttpEventType.UploadProgress,
          loaded: 500,
          total: 1000,
        },
        {
          type: HttpEventType.UploadProgress,
          loaded: 700,
          total: 1000,
        },
        new HttpErrorResponse({
          error: new Error('Something failed'),
          status: 500,
        })
      )
    );

    const attachmentIdThatFails = '3-abc';
    const fakeAttachments: AttachmentUploadEditModel[] = [
      { id: '1-abc', type: 'Attachment', AttachmentUploadId: '1234' },
      { id: '2-abc', type: 'Attachment' },
      { id: attachmentIdThatFails, type: 'Attachment' },
    ];

    const saveAttachmentMeta$ = jasmine.createSpy();
    saveAttachmentMeta$.and.returnValue(of(true));

    const translateService = {
      get: (): Observable<string> => {
        return of('Error');
      },
    };

    const newAttachmentService = {
      getAttachments: (): Observable<AttachmentUploadEditModel[]> => {
        return of(fakeAttachments);
      },
      getBlob: (): Observable<Blob> => {
        return of(new Blob(['test'], { type: 'image/png' }));
      },
      saveAttachmentMeta$: saveAttachmentMeta$,
    };

    const loggingService = jasmine.createSpyObj('LoggingService', ['debug', 'error']);

    service = new UploadAttachmentsService(
      newAttachmentService as unknown as NewAttachmentService,
      {} as UploadSingleAttachmentService,
      translateService as unknown as TranslateService,
      {} as DateHelperService,
      loggingService,
      {
        userSetting$: of({}),
      } as UserSettingService,
      {} as AlertController
    );

    const regUuid = '12345-abc';
    const draft: RegistrationDraft = {
      uuid: regUuid,
      syncStatus: SyncStatus.Sync,
      simpleMode: false,
      registration: {
        GeoHazardTID: 10,
        DtObsTime: 'test',
      },
    };

    const expected: AttachmentUploadEditModel[] = [
      { id: '1-abc', type: 'Attachment', AttachmentUploadId: '1234' },
      { id: '2-abc', type: 'Attachment', AttachmentUploadId: '12345-test-id' },
      undefined,
    ];
    // Test that uploadAllAttachments returns one fulfilled promise without value
    await expectAsync(service.uploadAllAttachments(draft)).toBeResolvedTo(expected);

    expect(loggingService.error).toHaveBeenCalled();
    expect(httpClient.post).toHaveBeenCalledTimes(2);
  });
});
