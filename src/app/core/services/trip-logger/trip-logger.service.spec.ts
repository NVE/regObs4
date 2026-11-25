import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { AlertController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { InanoSQLInstance } from '@nano-sql/core/lib/interfaces';
import { of } from 'rxjs';
import { AppMode } from 'src/app/modules/common-core/models';
import { TripService } from 'src/app/modules/common-regobs-api/services';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';
import { TestLoggingService } from 'src/app/modules/shared/services/logging/test-logging.service';
import { NanoSql } from '../../../../nanosql';
import { UserSettingService } from '../user-setting/user-setting.service';
import { isTripFromToday, isTripNotFoundError, TripLoggerService } from './trip-logger.service';
import { LegacyTrip } from './legacy-trip.model';
import moment from 'moment';

describe('TripLoggerService.cleanupOldLegacyTrip', () => {
  let tripsInDb: LegacyTrip[];
  let deleteCount: number;
  let service: TripLoggerService;

  beforeEach(() => {
    tripsInDb = [];
    deleteCount = 0;

    // Falsk lokal database: select gir tripsInDb, delete tømmer den
    const fakeDb = {
      query: (action: string) => ({
        exec: async () => {
          if (action === 'delete') {
            deleteCount++;
            tripsInDb = [];
            return [];
          }
          return tripsInDb;
        },
      }),
    } as unknown as InanoSQLInstance;
    spyOn(NanoSql, 'getInstance').and.returnValue(fakeDb);

    TestBed.configureTestingModule({
      providers: [
        TripLoggerService,
        { provide: UserSettingService, useValue: { appMode$: of(AppMode.Test) } },
        { provide: TripService, useValue: {} },
        { provide: TranslateService, useValue: {} },
        { provide: AlertController, useValue: {} },
        { provide: ToastController, useValue: {} },
        { provide: LoggingService, useClass: TestLoggingService },
      ],
    });
    service = TestBed.inject(TripLoggerService);
  });

  it('resolves without error when there is no old trip', async () => {
    await expectAsync(service.cleanupOldLegacyTrip()).toBeResolved();
    expect(deleteCount).toBe(0);
  });

  it('deletes the trip when it is from an earlier day', async () => {
    tripsInDb = [{ id: 'legacytrip', timestamp: moment().subtract(1, 'day').unix(), request: {} }];

    await expectAsync(service.cleanupOldLegacyTrip()).toBeResolved();
    expect(deleteCount).toBe(1);
  });

  it('keeps the trip when it is from today', async () => {
    tripsInDb = [{ id: 'legacytrip', timestamp: moment().unix(), request: {} }];

    await expectAsync(service.cleanupOldLegacyTrip()).toBeResolved();
    expect(deleteCount).toBe(0);
  });
});

describe('isTripFromToday', () => {
  it('Should return true if trip is from today', () => {
    const trip: LegacyTrip = {
      id: 'legacytrip',
      timestamp: moment().unix(),
      request: {},
    };

    const result = isTripFromToday(trip);

    expect(result).toBeTrue();
  });

  it('Should return false if trip is from yesterday', () => {
    const trip: LegacyTrip = {
      id: 'legacytrip',
      timestamp: moment().subtract(1, 'day').unix(),
      request: {},
    };

    const result = isTripFromToday(trip);
    expect(result).toBeFalse();
  });

  it('Should return false if timestamp is zero', () => {
    const trip: LegacyTrip = {
      id: 'legacytrip',
      timestamp: 0,
      request: {},
    };

    const result = isTripFromToday(trip);
    expect(result).toBeFalse();
  });

  it('Should return false if timestamp is null', () => {
    const trip: LegacyTrip = {
      id: 'legacytrip',
      timestamp: null,
      request: {},
    };

    const result = isTripFromToday(trip);
    expect(result).toBeFalse();
  });

  it('Should return false if trip is null', () => {
    const result = isTripFromToday(null);
    expect(result).toBeFalse();
  });

  it('Should return false if trip is undefined', () => {
    const result = isTripFromToday(undefined);
    expect(result).toBeFalse();
  });
});

describe('isTripNotFoundError', () => {
  it('should return true for HttpErrorResponse objects with trip error', () => {
    const error = {
      Message: 'The request is invalid.',
      ModelState: {
        Trip: ['Trip not found for deviceId 1cdb2dd1-5b35-4dc3-be74-045fb9202307'],
      },
    };

    // Tried to replicate an error object equal to what the api returns when
    // a trip is already stopped
    const err = new HttpErrorResponse({
      error,
      url: 'https://test-api.regobs.no/v5/Trip',
      status: 400,
      statusText: 'OK',
    });

    expect(isTripNotFoundError(err)).toBeTrue();
  });

  it('should be case insensitive', () => {
    const error = {
      Message: 'The request is invalid.',
      ModelState: {
        Trip: ['trip not found for deviceId 1cdb2dd1-5b35-4dc3-be74-045fb9202307'],
      },
    };

    const err = new HttpErrorResponse({
      error,
      url: 'https://test-api.regobs.no/v5/Trip',
      status: 400,
      statusText: 'OK',
    });

    expect(isTripNotFoundError(err)).toBeTrue();
  });

  it('should handle trip error message null', () => {
    const error = {
      Message: 'The request is invalid.',
      ModelState: {
        Trip: [null],
      },
    };

    const err = new HttpErrorResponse({
      error,
      url: 'https://test-api.regobs.no/v5/Trip',
      status: 400,
      statusText: 'OK',
    });

    expect(isTripNotFoundError(err)).toBeFalse();
  });

  it('should handle trip error message numbers', () => {
    const error = {
      Message: 'The request is invalid.',
      ModelState: {
        Trip: [1234],
      },
    };

    const err = new HttpErrorResponse({
      error,
      url: 'https://test-api.regobs.no/v5/Trip',
      status: 400,
      statusText: 'OK',
    });

    expect(isTripNotFoundError(err)).toBeFalse();
  });

  it('should return false if not error', () => {
    expect(isTripNotFoundError(undefined)).toBeFalse();
    expect(isTripNotFoundError(null)).toBeFalse();
    expect(isTripNotFoundError(12345)).toBeFalse();
    expect(isTripNotFoundError('Hello')).toBeFalse();
    expect(isTripNotFoundError({ foo: 'bar' })).toBeFalse();
  });

  it('should return false if not HttpErrorResponse', () => {
    expect(isTripNotFoundError(new Error('Some other error'))).toBeFalse();
  });
});
