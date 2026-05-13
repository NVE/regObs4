import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { UserSettingService } from './user-setting.service';
import { delay, firstValueFrom, Observable, of } from 'rxjs';
import { UserSetting } from '../../models/user-settings.model';
import { GeoHazard } from 'src/app/modules/common-core/models';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTestLogger } from 'src/app/modules/shared/services/logging/test-logging.service';
import { Injectable } from '@angular/core';

describe('UserSettingService', () => {
  let db: Partial<UserSetting>;

  beforeEach(() => {
    db = { photographer: 'Hestejente3000' };
    saveSpy.calls.reset();
  });

  const saveSpy = jasmine.createSpy('saveUserSettingsToDb').and.callFake((us) => {
    db = { ...us };
    return of(db);
  });

  @Injectable()
  class UserSettingServiceWithoutExternalDeps extends UserSettingService {
    protected override getUserSettingsFromDb(): Observable<UserSetting> {
      // Lesing av data tar 1 sek
      return of(db as unknown as UserSetting).pipe(delay(1000));
    }

    protected override parseUrlParameters(): { geoHazards: GeoHazard[] | null; daysBack: number | null } {
      return { geoHazards: null, daysBack: null };
    }

    protected override getDefaultUserSettings(): UserSetting {
      return {} as unknown as UserSetting;
    }

    protected override saveUserSettingsToDb(userSetting: UserSetting): Observable<UserSetting[]> {
      return saveSpy(userSetting);
    }
  }

  it('should not be possible to overwrite usersettings using the update method early', fakeAsync(() => {
    TestBed.configureTestingModule({
      providers: [
        provideTranslateService(),
        provideTestLogger(),
        { provide: UserSettingService, useClass: UserSettingServiceWithoutExternalDeps },
      ],
    });

    const service = TestBed.inject(UserSettingService);
    service.init();

    // Update usersettings early (before waiting for userSettings$)
    service.updateUserSettings({ copyright: 'Kantkorn48' });

    tick(300);
    // Vent litt, men siden det tar 1 sek å lese fra db bør den ikke ha lagret noe enda
    // (Da hadde vi risikert å overskrevet data, siden lesing tar 1 sek)

    expect(saveSpy).toHaveBeenCalledTimes(0);
    expect(db).toEqual({
      photographer: 'Hestejente3000',
    });

    tick(1500);
    // Nå bør den ha lagra.

    expect(saveSpy).toHaveBeenCalledTimes(1);
    expect(db).toEqual({
      photographer: 'Hestejente3000',
      copyright: 'Kantkorn48',
    });

    // Sjekk at public usersettings også stemmer
    const userSettings = firstValueFrom(service.userSetting$);
    expectAsync(userSettings).toBeResolvedTo({
      photographer: 'Hestejente3000',
      copyright: 'Kantkorn48',
    } as unknown as UserSetting);
  }));

  it('normalizes stored daysBack to last valid option when the saved value is no longer in settings', fakeAsync(async () => {
    // Set up a stored value that is no longer a valid option.
    // Valid Ice options in settings.ts are [0, 1, 2, 3, 7, 14] — 28 is not among them anymore.
    db = {
      currentGeoHazard: [GeoHazard.Ice],
      observationDaysBack: [
        { geoHazard: GeoHazard.Ice, daysBack: 28 }, // no longer valid
        { geoHazard: GeoHazard.Snow, daysBack: 7 }, // still valid, must not change
      ],
    };

    TestBed.configureTestingModule({
      providers: [
        provideTranslateService(),
        provideTestLogger(),
        { provide: UserSettingService, useClass: UserSettingServiceWithoutExternalDeps },
      ],
    });

    const service = TestBed.inject(UserSettingService);
    service.init();

    tick(1500); // wait for simulated 1s DB read + debounce

    const daysBack = await firstValueFrom(service.daysBackForCurrentGeoHazard$);

    // Should fall back to last valid option (14), not the stored invalid value (28)
    expect(daysBack).toBe(14);
  }));

  it('does not change stored daysBack when the value is still a valid option', fakeAsync(async () => {
    db = {
      currentGeoHazard: [GeoHazard.Snow],
      observationDaysBack: [
        { geoHazard: GeoHazard.Snow, daysBack: 7 }, // valid option
      ],
    };

    TestBed.configureTestingModule({
      providers: [
        provideTranslateService(),
        provideTestLogger(),
        { provide: UserSettingService, useClass: UserSettingServiceWithoutExternalDeps },
      ],
    });

    const service = TestBed.inject(UserSettingService);
    service.init();

    tick(1500);

    const daysBack = await firstValueFrom(service.daysBackForCurrentGeoHazard$);

    expect(daysBack).toBe(7);
  }));
});
