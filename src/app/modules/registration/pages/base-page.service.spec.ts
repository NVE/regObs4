import { RegistrationTid, SyncStatus } from 'src/app/modules/common-registration/registration.models';
import { NewAttachmentService } from 'src/app/modules/common-registration/registration.services';
import { BasePageService } from './base-page-service';
import { LoggingService } from '../../shared/services/logging/logging.service';
import { DraftRepositoryService } from 'src/app/core/services/draft/draft-repository.service';
import { RegistrationDraft } from 'src/app/core/services/draft/draft-model';
import { TestBed } from '@angular/core/testing';
import { NgZone } from '@angular/core';

describe('BasePageService', () => {

  let service: BasePageService;
  let newAttachmentService: NewAttachmentService;
  let loggerService: jasmine.SpyObj<LoggingService>;
  let ngZone: jasmine.SpyObj<NgZone>;

  let draftRepository: {
    save: jasmine.Spy<DraftRepositoryService['save']>;
  };

  const draft: RegistrationDraft = {
    uuid: 'abc',
    syncStatus: SyncStatus.Draft,
    registration: {
      GeoHazardTID: 10,
      DtObsTime: 'obsTime',
      AvalancheObs: {
        DtAvalancheTime: 'avalancheTime',
        FractureWidth: 23,
      }
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});

    draftRepository = {
      save: jasmine.createSpy('DraftService.save')
    };

    loggerService = jasmine.createSpyObj('LoggingService', ['debug', 'error']);
    newAttachmentService = jasmine.createSpyObj('NewAttachmentService', ['removeAttachments']);
    ngZone = jasmine.createSpyObj('NgZone', ['run']);

    service = new BasePageService(
      draftRepository as unknown as DraftRepositoryService,
      newAttachmentService,
      ngZone,
      null,
      null,
      loggerService
    );
  });

  it('reset() should empty the registration', async () => {
    
    await service.reset(draft, RegistrationTid.AvalancheObs);
    const expectedEmptyDraft: RegistrationDraft = {
        uuid: 'abc',
        syncStatus: SyncStatus.Draft,
        registration: {
          GeoHazardTID: 10,
          DtObsTime: 'obsTime'
          //No AvalancheObs anymore
        }
      };
    expect(draftRepository.save).toHaveBeenCalledTimes(1);
    expect(draftRepository.save.calls.allArgs()).toEqual([
      [{ ...expectedEmptyDraft }],
    ]);
  });
});
