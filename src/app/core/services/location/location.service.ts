import { Injectable } from '@angular/core';
import { LocationService as RegobsApiLocationService } from 'src/app/modules/common-regobs-api/services';
import { GeoHazard } from 'src/app/modules/common-core/models';
import { catchError, switchMap } from 'rxjs/operators';
import { RegobsAuthService } from '../../../modules/auth/services/regobs-auth.service';
import { of } from 'rxjs';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';

const DEBUG_TAG = 'LocationService';
@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor(
    private regobsAuthService: RegobsAuthService,
    private apiLocationService: RegobsApiLocationService,
    private loggingService: LoggingService
  ) {}

  getLocationWithinRadiusObservable(geoHazard: GeoHazard, lat: number, lng: number, radius: number) {
    return this.regobsAuthService.loggedInUser$.pipe(
      switchMap(() =>
        this.apiLocationService.LocationWithinRadius({
          geoHazardTypeIds: [geoHazard],
          radius,
          latitude: lat,
          longitude: lng,
          returnCount: 100,
        })
      ),
      catchError((err) => {
        this.loggingService.error(err, DEBUG_TAG, 'Could not fetch loactions within radius');
        return of([]);
      })
    );
  }
}
