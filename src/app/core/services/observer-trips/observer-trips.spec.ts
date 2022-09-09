import { fakeAsync, flush, tick } from '@angular/core/testing';
import { BehaviorSubject, firstValueFrom, ReplaySubject } from 'rxjs';
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
  let loggedInUser: ReplaySubject<LoggedInUser>;
  let authService: jasmine.SpyObj<RegobsAuthService>;
  let service: ObserverTripsService;

  beforeEach(() => {
    tripService = jasmine.createSpyObj('TripService', ['TripGet']);
    loggerService = jasmine.createSpyObj('LoggerService', ['debug', 'error']);
    database = {};
    dbService = {
      get: async (key) => database[key],
      set: async (key, val) => database[key] = val
    } as DatabaseService;
    spyOn(dbService, 'get');
    spyOn(dbService, 'set');
    loggedInUser = new ReplaySubject<LoggedInUser>();
    authService = jasmine.createSpyObj('RegobsAuthService', {}, { loggedInUser$: loggedInUser.asObservable() });
    service = new ObserverTripsService(tripService, loggerService, dbService, authService);
  });

  it('should not fetch data if it has valid data saved in database', fakeAsync(async () => {
    database = {
      isAuthorizedKey: true,
      toggleKey: true,
      dataKey: { features: true },
      dataModifiedKey: Date.now()
    };

    loggedInUser.next({ isLoggedIn: true });

    const geojson = await firstValueFrom(service.geojson$);

    // Let stuff happen
    tick(100);

    expect(geojson.features).toBeTrue();
  }));

  it('it should not do anything until a user is logged in', fakeAsync(() => {
    // Let some time pass
    tick(100);

    // We should have asked for the logged in user
    expect(Object.getOwnPropertyDescriptor(authService, 'loggedInUser$').get).toHaveBeenCalled();

    // But nothing else should have happened
    expect(tripService.TripGet).toHaveBeenCalledTimes(0);
    expect(dbService.get).toHaveBeenCalledTimes(0);
    expect(dbService.set).toHaveBeenCalledTimes(0);

    // emit something else than a logged in user
    loggedInUser.next({ email: null, token: null, isLoggedIn: false });

    // Let some time pass
    tick(100);

    // Still should not have called any other dependencies
    expect(tripService.TripGet).toHaveBeenCalledTimes(0);
    expect(dbService.get).toHaveBeenCalledTimes(0);
    expect(dbService.set).toHaveBeenCalledTimes(0);
  }));
});