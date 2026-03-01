import { TestBed, inject } from '@angular/core/testing';

import { AppResetService } from './app-reset.service';
import { DbHelperService } from '../../../../core/services/db-helper/db-helper.service';
import { LoggingService } from '../logging/logging.service';
import { OnReset } from '../../interfaces/on-reset.interface';

describe('AppResetService', () => {
  let dbHelperService: DbHelperService;
  let loggingService: LoggingService;
  let firstResetService: OnReset;
  let secondResetService: OnReset;
  let service: AppResetService;

  beforeEach(() => {
    dbHelperService = jasmine.createSpyObj('DbHelperService', {
      resetDb: () => Promise.resolve(),
    });
    loggingService = jasmine.createSpyObj('LoggingService', {
      log: () => {
        return;
      },
    });
    firstResetService = jasmine.createSpyObj('OnReset', ['appOnReset', 'appOnResetComplete']);
    secondResetService = jasmine.createSpyObj('OnReset', ['appOnReset', 'appOnResetComplete']);

    TestBed.configureTestingModule({
      providers: [
        { provide: DbHelperService, useValue: dbHelperService },
        { provide: LoggingService, useValue: loggingService },
        { provide: 'OnReset', useValue: firstResetService, multi: true },
        { provide: 'OnReset', useValue: secondResetService, multi: true },
      ],
    });
  });

  beforeEach(inject([AppResetService], (appResetService: AppResetService) => {
    service = appResetService;
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('appOnReset should be called for all OnReset providers', async () => {
    await service.resetApp();
    expect(dbHelperService.resetDb).toHaveBeenCalled();
    expect(firstResetService.appOnReset).toHaveBeenCalled();
    expect(secondResetService.appOnReset).toHaveBeenCalled();
    expect(firstResetService.appOnResetComplete).toHaveBeenCalled();
    expect(secondResetService.appOnResetComplete).toHaveBeenCalled();
  });
});
