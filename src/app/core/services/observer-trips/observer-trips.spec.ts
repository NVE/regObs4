import { discardPeriodicTasks, fakeAsync, flush, flushMicrotasks, resetFakeAsyncZone, tick } from '@angular/core/testing';
import { BehaviorSubject, firstValueFrom, of, ReplaySubject, timeout } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';
import { RegobsAuthService } from 'src/app/modules/auth/services/regobs-auth.service';
import { TripService } from 'src/app/modules/common-regobs-api';
import { LoggedInUser } from 'src/app/modules/login/models/logged-in-user.model';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';
import { DatabaseService } from '../database/database.service';
import { ObserverTripsService, dataKey, dataModifiedKey, toggledOnKey, isAuthorizedKey } from './observer-trips.service';

describe('ObserverTripsService', () => {
  let tripService: jasmine.SpyObj<TripService>;
  let loggerService: jasmine.SpyObj<LoggingService>;
  let database: any;
  let dbService: DatabaseService;
  let dbServiceGetSpy: jasmine.Spy;
  let dbServiceSetSpy: jasmine.Spy;
  let loggedInUser: ReplaySubject<LoggedInUser>;
  let authService: jasmine.SpyObj<RegobsAuthService>;
  let service: ObserverTripsService;

  beforeEach(() => {
    resetFakeAsyncZone();
    tripService = jasmine.createSpyObj('TripService', ['TripGet']);
    loggerService = jasmine.createSpyObj('LoggerService', ['debug', 'error']);
    database = {};
    dbService = {
      get: async (key) => database[key],
      set: async (key, val) => database[key] = val
    } as DatabaseService;
    dbServiceGetSpy = spyOn(dbService, 'get').and.callThrough();
    dbServiceSetSpy = spyOn(dbService, 'set').and.callThrough();
    loggedInUser = new ReplaySubject<LoggedInUser>();
    authService = jasmine.createSpyObj('RegobsAuthService', {}, { loggedInUser$: loggedInUser.asObservable() });
    service = new ObserverTripsService(tripService, loggerService, dbService, authService);
  });

  it('should not fetch data if it has valid data saved in database', fakeAsync(async () => {
    database = {
      [isAuthorizedKey]: true,
      [toggledOnKey]: true,
      [dataKey]: { features: true },
      [dataModifiedKey]: Date.now()
    };

    loggedInUser.next({ isLoggedIn: true });

    const geojson = await firstValueFrom(service.geojson$);

    // Let stuff happen
    tick(100);

    // It should not be needed to write anything to the db in this scenario
    expect(dbServiceSetSpy).toHaveBeenCalledTimes(0);

    // Check that service checks the authorized value and reads data from database
    // TODO: Remove
    const dbArgs = dbServiceGetSpy.calls.allArgs();
    expect(dbArgs).toContain([isAuthorizedKey]);
    expect(dbArgs).toContain([dataKey]);
    expect(dbArgs).toContain([dataModifiedKey]);

    // Check that tripService was not called
    expect(tripService.TripGet).toHaveBeenCalledTimes(0);

    expect(geojson.features).toBeTrue();
  }));

  it('should fetch data if data is too old', fakeAsync(async () => {
    // "as null" because TripGet return type is Observable<null> but it returns an observable with geojson data
    tripService.TripGet.and.returnValue(of({ features: [{ type: 'NewFeature1' }, { type: 'NewFeature2' }] } as null));

    database = {
      [isAuthorizedKey]: true,
      [toggledOnKey]: true,
      [dataKey]: { features: [{ type: 'OldFeature1' }, { type: 'OldFeature1' }, { type: 'OldFeature1' }] },
      [dataModifiedKey]: 100
    };

    loggedInUser.next({ isLoggedIn: true });

    // Something must subscribe for stuff to happen
    const geojson = await firstValueFrom(service.geojson$);

    // Let time pass
    tick(100);

    // Check that tripService was called to fetch new data
    expect(tripService.TripGet).toHaveBeenCalledTimes(1);
    expect(geojson.features).toHaveSize(2);
    expect(geojson.features[0].type).toBe('NewFeature1');
  }));

  it('should use old data if fetching new data fails', fakeAsync(async () => {
    // "as null" because TripGet return type is Observable<null> but it returns an observable with geojson data
    tripService.TripGet.and.throwError('Failed to fetch new data');

    database = {
      [isAuthorizedKey]: true,
      [toggledOnKey]: true,
      [dataKey]: { features: [{ type: 'OldFeature1' }, { type: 'OldFeature1' }, { type: 'OldFeature1' }] },
      [dataModifiedKey]: 100
    };

    loggedInUser.next({ isLoggedIn: true });

    // Something must subscribe for stuff to happen
    const geojson = await firstValueFrom(service.geojson$);

    // Let time pass
    tick(100);

    // Check that tripService was called to try fetching new data
    expect(tripService.TripGet).toHaveBeenCalledTimes(1);
    expect(geojson.features[0].type).toBe('OldFeature1');
  }));

  it('it should not do anything until a user is logged in', fakeAsync(async () => {
    // Subscribe to geojson so logic in service starts
    const geojsonPromise = firstValueFrom(service.geojson$.pipe(timeout(1000)));

    // Let some time pass
    tick(100);

    // But nothing else should have happened
    expect(tripService.TripGet).toHaveBeenCalledTimes(0);
    expect(dbServiceGetSpy).toHaveBeenCalledTimes(0);

    // emit something else than a logged in user
    loggedInUser.next({ email: null, token: null, isLoggedIn: false });

    // Let timeout complete and promise to reject
    try {
      tick(2000);
      await geojsonPromise;
    // eslint-disable-next-line no-empty
    } catch (error) {}

    // Still should not have called any dependencies
    expect(tripService.TripGet).toHaveBeenCalledTimes(0);
    expect(dbServiceGetSpy).toHaveBeenCalledTimes(0);
  }));
});