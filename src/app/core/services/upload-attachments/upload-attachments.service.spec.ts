import { HttpClient, HttpErrorResponse, HttpEvent, HttpEventType, HttpResponse, HttpUploadProgressEvent } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import cloneDeep from 'clone-deep';
import { map, Observable, of, tap } from 'rxjs';
import { AttachmentUploadEditModel, IRegistration, SyncStatus } from 'src/app/modules/common-registration/registration.models';
import { NewAttachmentService, ProgressService } from 'src/app/modules/common-registration/registration.services';
import { AttachmentService, RegistrationEditModel } from 'src/app/modules/common-regobs-api';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';
import { GeoHazard } from '../../models/geo-hazard.enum';

import { UploadAttachmentError, UploadAttachmentsService } from './upload-attachments.service';

describe('UploadAttachmentsService', () => {
  let service: UploadAttachmentsService;

  // beforeEach(() => {
  //   TestBed.configureTestingModule({
  //     providers: []
  //   });
  //   service = TestBed.inject(UploadAttachmentsService);
  // });

  it('should not upload attachments with AttachmentUploadId (already uploaded)', async () => {
    const httpClient = jasmine.createSpyObj('HttpClient', ['post']);

    // List of fake attachments that fake newAttachmentsService will return
    const fakeAttachments: AttachmentUploadEditModel[] = [
      {id: '1234', type: 'Attachment', AttachmentUploadId: '1234' },
      {id: '5678', type: 'Attachment', AttachmentUploadId: '5678' }
    ];

    const fakeAttachmentsCopy = cloneDeep(fakeAttachments);

    const newAttachmentService = {
      getAttachments: (): Observable<AttachmentUploadEditModel[]> => {
        return of(fakeAttachments);
      }
    };

    service = new UploadAttachmentsService(
      httpClient,
      {} as ProgressService,
      newAttachmentService as unknown as NewAttachmentService,
      {} as AttachmentService,
      {} as LoggingService
    );

    const draft: RegistrationEditModel = {
      GeoHazardTID: 10,
      DtObsTime: 'test',
    };

    const registration: IRegistration = {
      id: '12345-abc',
      changed: Date.now(),
      geoHazard: 10,
      syncStatus: SyncStatus.Sync,
      request: draft
    };

    const result = await service.uploadAllAttachments(registration);

    // Test that post is not called at all
    expect(httpClient.post.calls.any()).toBe(false);
    // Test that uploadAllAttachments just returns the attachments,
    // as they are already uploaded
    expect(result).toEqual(fakeAttachmentsCopy);
  });

  it('should upload attachments for attachments without AttachmentUploadId and set progress', async () => {
    const httpClient = jasmine.createSpyObj('HttpClient', ['post']);
    const responseAttachmentUploadId = '12345-test-id';

    httpClient.post.and.returnValue(of(
      {
        type: HttpEventType.UploadProgress,
        loaded: 500,
        total: 1000
      },
      {
        type: HttpEventType.UploadProgress,
        loaded: 1000,
        total: 1000
      },
      new HttpResponse({ body: responseAttachmentUploadId })
    ));

    const fakeAttachments: AttachmentUploadEditModel[] = [
      {id: '1234', type: 'Attachment', AttachmentUploadId: '1234' },
      {id: '5678', type: 'Attachment' }
    ];

    const addAttachmentsResult: AttachmentUploadEditModel[] = [
      {id: '1234', type: 'Attachment', AttachmentUploadId: '1234' },
      {id: '5678', type: 'Attachment', AttachmentUploadId: responseAttachmentUploadId}
    ];

    const saveAttachmentMeta$ = jasmine.createSpy();
    saveAttachmentMeta$.and.returnValue(of(true));

    const newAttachmentService = {
      getAttachments: (): Observable<AttachmentUploadEditModel[]> => {
        return of(fakeAttachments);
      },
      getBlob: (): Observable<Blob> => {
        return of(new Blob(['test'], {type: 'image/png'}));
      },
      saveAttachmentMeta$: saveAttachmentMeta$
    };

    const progressService = jasmine.createSpyObj('ProgressService', ['setAttachmentProgress']);

    service = new UploadAttachmentsService(
      httpClient,
      progressService,
      newAttachmentService as unknown as NewAttachmentService,
      {} as AttachmentService,
      jasmine.createSpyObj('LoggingService', ['debug'])
    );

    const draft: RegistrationEditModel = {
      GeoHazardTID: 10,
      DtObsTime: 'test',
    };

    const registration: IRegistration = {
      id: '12345-abc',
      changed: Date.now(),
      geoHazard: 10,
      syncStatus: SyncStatus.Sync,
      request: draft
    };

    const result = await service.uploadAllAttachments(registration);

    // Test that we call post one time as we have one image to upload
    expect(httpClient.post).toHaveBeenCalledTimes(1);

    // Test that upload progress is reported as we upload
    expect(progressService.setAttachmentProgress).toHaveBeenCalledTimes(2);

    // Test that uploadAllAttachments just returns the attachments,
    // as they are already uploaded
    expect(result).toEqual(addAttachmentsResult);
  });

  it('should throw an error containing regid and attachment ids', async () => {
    const httpClient = jasmine.createSpyObj('HttpClient', ['post']);
    const responseAttachmentUploadId = '12345-test-id';

    httpClient.post.and.returnValues(
      of(
        {
          type: HttpEventType.UploadProgress,
          loaded: 500,
          total: 1000
        },
        {
          type: HttpEventType.UploadProgress,
          loaded: 1000,
          total: 1000
        },
        new HttpResponse({ body: responseAttachmentUploadId })
      ),
      // Second upload will fail, it starts to upload, but gets a server error
      of(
        {
          type: HttpEventType.UploadProgress,
          loaded: 200,
          total: 1000
        },
        {
          type: HttpEventType.UploadProgress,
          loaded: 500,
          total: 1000
        },
        {
          type: HttpEventType.UploadProgress,
          loaded: 700,
          total: 1000
        },
        new HttpErrorResponse({
          error: new Error('Something failed'),
          status: 500,
        })
      )
    );

    const attachmentIdThatFails = '3-abc';
    const fakeAttachments: AttachmentUploadEditModel[] = [
      {id: '1-abc', type: 'Attachment', AttachmentUploadId: '1234' },
      {id: '2-abc', type: 'Attachment' },
      {id: attachmentIdThatFails, type: 'Attachment' }
    ];

    const saveAttachmentMeta$ = jasmine.createSpy();
    saveAttachmentMeta$.and.returnValue(of(true));

    const newAttachmentService = {
      getAttachments: (): Observable<AttachmentUploadEditModel[]> => {
        return of(fakeAttachments);
      },
      getBlob: (): Observable<Blob> => {
        return of(new Blob(['test'], {type: 'image/png'}));
      },
      saveAttachmentMeta$: saveAttachmentMeta$
    };

    const progressService = jasmine.createSpyObj('ProgressService', ['setAttachmentProgress']);
    const loggingService = jasmine.createSpyObj('LoggingService', ['debug', 'error']);

    service = new UploadAttachmentsService(
      httpClient,
      progressService,
      newAttachmentService as unknown as NewAttachmentService,
      {} as AttachmentService,
      loggingService
    );

    const draft: RegistrationEditModel = {
      GeoHazardTID: 10,
      DtObsTime: 'test',
    };

    const regId = '12345-abc';
    const registration: IRegistration = {
      id: regId,
      changed: Date.now(),
      geoHazard: 10,
      syncStatus: SyncStatus.Sync,
      request: draft
    };

    // Test that uploadAllAttachments rejects with an error
    // containing regid and attachment ids
    await expectAsync(service.uploadAllAttachments(registration))
      .toBeRejectedWith(new UploadAttachmentError(regId, [attachmentIdThatFails]));

    expect(loggingService.error).toHaveBeenCalled();
    expect(httpClient.post).toHaveBeenCalledTimes(2);
  });


});
