import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { RegobsAuthService } from '../../../modules/auth/services/regobs-auth.service';
import { LoggingService } from '../../../modules/shared/services/logging/logging.service';
import { TestLoggingService } from '../../../modules/shared/services/logging/test-logging.service';
import { TripLoggerService } from '../trip-logger/trip-logger.service';
import { UserSettingService } from '../user-setting/user-setting.service';
import { WarningService } from '../warning/warning.service';
import { DataMarshallService } from './data-marshall.service';

describe('DataMarshallService.backgroundFetchUpdate', () => {
  let service: DataMarshallService;
  let loggingService: LoggingService;
  let warningService: jasmine.SpyObj<WarningService>;
  let tripLoggerService: jasmine.SpyObj<TripLoggerService>;

  beforeEach(() => {
    warningService = jasmine.createSpyObj<WarningService>('WarningService', ['updateWarnings']);
    warningService.updateWarnings.and.resolveTo();
    tripLoggerService = jasmine.createSpyObj<TripLoggerService>('TripLoggerService', ['cleanupOldLegacyTrip']);
    tripLoggerService.cleanupOldLegacyTrip.and.resolveTo(undefined);

    TestBed.configureTestingModule({
      providers: [
        DataMarshallService,
        { provide: WarningService, useValue: warningService },
        { provide: TripLoggerService, useValue: tripLoggerService },
        { provide: UserSettingService, useValue: {} },
        { provide: RegobsAuthService, useValue: {} },
        { provide: Platform, useValue: {} },
        { provide: Router, useValue: {} },
        { provide: LoggingService, useClass: TestLoggingService },
      ],
    });
    service = TestBed.inject(DataMarshallService);
    loggingService = TestBed.inject(LoggingService);
  });

  it('updates warnings and cleans up old trips', async () => {
    await service.backgroundFetchUpdate();

    expect(warningService.updateWarnings).toHaveBeenCalled();
    expect(tripLoggerService.cleanupOldLegacyTrip).toHaveBeenCalled();
  });

  it('logs errors instead of rejecting', async () => {
    const error = new Error('Database failure');
    tripLoggerService.cleanupOldLegacyTrip.and.rejectWith(error);
    const errorSpy = spyOn(loggingService, 'error');

    await expectAsync(service.backgroundFetchUpdate()).toBeResolved();
    expect(errorSpy).toHaveBeenCalledWith(error, 'DataMarshallService', jasmine.any(String));
  });
});
