import { AttachmentUploadEditModel, RegistrationTid, SyncStatus } from 'src/app/modules/common-registration/registration.models';
import { NewAttachmentService } from 'src/app/modules/common-registration/registration.services';
import { BasePageService } from './base-page-service';
import { LoggingService } from '../../shared/services/logging/logging.service';
import { DraftRepositoryService } from 'src/app/core/services/draft/draft-repository.service';
import { RegistrationDraft } from 'src/app/core/services/draft/draft-model';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

describe('BasePageService', () => {

  let service: BasePageService;
  let newAttachmentService: jasmine.SpyObj<NewAttachmentService>;
  let loggerService: jasmine.SpyObj<LoggingService>;

  let draftRepository: {
    save: jasmine.Spy<DraftRepositoryService['save']>;
  };

  const avalancheObsDraft: RegistrationDraft = {
    uuid: 'draft',
    syncStatus: SyncStatus.Draft,
    registration: {
      GeoHazardTID: 10,
      DtObsTime: 'obsTime',
      AvalancheObs: {
        DtAvalancheTime: 'avalancheTime',
        Comment: 'avalance obs comment'
      },
      Incident: {
        Comment: 'incident comment'
      }
    }
  };

  const attachments: AttachmentUploadEditModel[] = [
    {
      id: '1',
      type: 'Attachment',
      AttachmentId: 1,
      RegistrationTID: RegistrationTid.Incident,
    },{
      id: '2',
      type: 'Attachment',
      AttachmentId: 2,
      RegistrationTID: RegistrationTid.Incident,
    },
    {
      id: '3',
      type: 'Attachment',
      AttachmentId: 3,
      RegistrationTID: RegistrationTid.AvalancheObs,
    },{
      id: '4',
      type: 'Attachment',
      AttachmentId: 4,
      RegistrationTID: RegistrationTid.DangerObs
    }];

  beforeEach(() => {
    TestBed.configureTestingModule({});

    draftRepository = {
      save: jasmine.createSpy('DraftService.save')
    };

    loggerService = jasmine.createSpyObj('LoggingService', ['debug', 'error']);
    newAttachmentService = jasmine.createSpyObj('NewAttachmentService', ['getAttachments', 'removeAttachment']);

    service = new BasePageService(
      draftRepository as unknown as DraftRepositoryService,
      newAttachmentService,
      null,
      null,
      loggerService
    );
  });

  it('delete should delete the avalanche and incident registration', async () => {

    const expectedEmptyDraft: RegistrationDraft = {
      uuid: 'draft',
      syncStatus: SyncStatus.Draft,
      registration: {
        GeoHazardTID: 10,
        DtObsTime: 'obsTime'
        //No AvalancheObs or Incident anymore
      }
    };
    newAttachmentService.getAttachments.and.returnValue(of(attachments));

    await service.delete(avalancheObsDraft, [RegistrationTid.AvalancheObs, RegistrationTid.Incident]);
    expect(draftRepository.save).toHaveBeenCalledTimes(1);
    expect(draftRepository.save.calls.allArgs()).toEqual([
      [{ ...expectedEmptyDraft }],
    ]);
    expect(newAttachmentService.getAttachments).toHaveBeenCalledOnceWith('draft');
    expect(newAttachmentService.removeAttachment).toHaveBeenCalledTimes(3);
    expect(newAttachmentService.removeAttachment).toHaveBeenCalledWith('draft', '1');
    expect(newAttachmentService.removeAttachment).toHaveBeenCalledWith('draft', '2');
    expect(newAttachmentService.removeAttachment).toHaveBeenCalledWith('draft', '3');
  });

});
