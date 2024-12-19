import { AlertController } from '@ionic/angular/standalone';
import { provideTranslateService } from '@ngx-translate/core';
import cloneDeep from 'clone-deep';
import { Observable, of } from 'rxjs';
import { AttachmentUploadEditModel, SyncStatus } from 'src/app/modules/common-registration/registration.models';
import { NewAttachmentService } from 'src/app/modules/common-registration/registration.services';
import { RegistrationDraft } from '../draft/draft-model';
import { UploadAttachmentsService } from './upload-attachments.service';
import { UploadSingleAttachmentService } from './upload-single-attachment.service';
import { TestBed } from '@angular/core/testing';
import { provideTestLogger } from 'src/app/modules/shared/services/logging/test-logging.service';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';

describe('UploadAttachmentsService', () => {
  it('should not upload attachments with AttachmentUploadId (already uploaded)', async () => {
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

    TestBed.configureTestingModule({
      providers: [
        provideTranslateService(),
        provideTestLogger(),
        { provide: NewAttachmentService, useValue: newAttachmentService },
        { provide: UploadSingleAttachmentService, useValue: null },
      ],
    });
    const service = TestBed.inject(UploadAttachmentsService);

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

    // Test that uploadAllAttachments just returns the attachments,
    // as they are already uploaded
    expect(result).toEqual(fakeAttachmentsCopy);
  });

  it('should upload attachments for attachments without AttachmentUploadId', async () => {
    const responseAttachmentUploadId = '12345-test-id';

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

    const uploadSingleAttachmentService = {
      upload: async () => {
        return { id: '5678', type: 'Attachment', AttachmentUploadId: '12345-test-id' };
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
    TestBed.configureTestingModule({
      providers: [
        provideTranslateService(),
        provideTestLogger(),
        { provide: NewAttachmentService, useValue: newAttachmentService },
        { provide: UploadSingleAttachmentService, useValue: uploadSingleAttachmentService },
      ],
    });
    const service = TestBed.inject(UploadAttachmentsService);

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

    // Test that uploadAllAttachments just returns the attachments,
    // as they are already uploaded
    expect(result).toEqual(addAttachmentsResult);
  });

  it('should return failed attachment upload as undefined', async () => {
    const attachmentIdThatFails = '3-abc';
    const fakeAttachments: AttachmentUploadEditModel[] = [
      { id: '1-abc', type: 'Attachment', AttachmentUploadId: '1234' },
      { id: '2-abc', type: 'Attachment' },
      { id: attachmentIdThatFails, type: 'Attachment' },
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

    TestBed.configureTestingModule({
      providers: [
        provideTranslateService(),
        provideTestLogger(),
        { provide: NewAttachmentService, useValue: newAttachmentService },
        { provide: UploadSingleAttachmentService, useValue: null },
        { provide: AlertController, useValue: null },
      ],
    });
    const service = TestBed.inject(UploadAttachmentsService);
    const logger = TestBed.inject(LoggingService);
    spyOn(logger, 'error').and.callThrough();

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
      undefined,
      undefined,
    ];
    // Test that uploadAllAttachments returns one fulfilled promise without value
    await expectAsync(service.uploadAllAttachments(draft)).toBeResolvedTo(expected);

    expect(logger.error).toHaveBeenCalled();
  });
});
