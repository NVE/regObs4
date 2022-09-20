import { fakeAsync, resetFakeAsyncZone, tick } from '@angular/core/testing';
import { firstValueFrom, of, ReplaySubject, timeout } from 'rxjs';
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

  it('should emit null if obsturer is toggled off and save toggle state to db', fakeAsync(async () => {
    database = {
      [isAuthorizedKey]: true,
      [toggledOnKey]: true,
      [dataKey]: { features: true },
      [dataModifiedKey]: Date.now()
    };

    loggedInUser.next({ isLoggedIn: true });

    // Check that geojson is not null when toggle is on
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let geojson: any = 'NONE_EMITTED_YET';
    service.geojson$.subscribe(newVal => geojson = newVal);

    tick(100);

    expect(geojson.features).toBeTrue();

    await service.toggle();

    tick(100);

    // Toggle state should have been saved to db
    expect(dbServiceSetSpy).toHaveBeenCalledTimes(1);
    expect(dbServiceSetSpy).toHaveBeenCalledWith(toggledOnKey, false);
    expect(database[toggledOnKey]).toBe(false);

    // Emitted geojson$ value should be null
    expect(geojson).toBeNull();

    // geojson$ should emit data when toggled on again
    await service.toggle();
    tick(100);
    expect(database[toggledOnKey]).toBe(true);
    expect(geojson.features).toBeTrue();
  }));

  it('should not fetch data if it has valid data saved in database', fakeAsync(async () => {
    database = {
      [isAuthorizedKey]: true,
      [toggledOnKey]: true,
      [dataKey]: { features: true },
      [dataModifiedKey]: Date.now()
    };

    loggedInUser.next({ isLoggedIn: true });

    const geojson = await firstValueFrom(service.geojson$);

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

    // Check that tripService was called to fetch new data
    expect(tripService.TripGet).toHaveBeenCalledTimes(1);
    expect(geojson.features).toHaveSize(2);
    expect(geojson.features[0].type).toBe('NewFeature1');
  }));

  it('should use old data if fetching new data fails', fakeAsync(async () => {
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

    // Check that tripService was called to try fetching new data
    expect(tripService.TripGet).toHaveBeenCalledTimes(1);
    expect(geojson.features[0].type).toBe('OldFeature1');
  }));

  it('it should not do anything until a user is logged in', fakeAsync(async () => {
    // Subscribe to geojson so logic in service starts
    const geojsonPromise = firstValueFrom(service.geojson$.pipe(timeout(1000)));

    // Let some time pass
    tick(100);

    // Should not have called any dependencies as we are not logged in
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