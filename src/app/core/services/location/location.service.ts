import { Injectable, inject } from '@angular/core';
import { LocationService as RegobsApiLocationService } from 'src/app/modules/common-regobs-api';
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
  private regobsAuthService = inject(RegobsAuthService);
  private apiLocationService = inject(RegobsApiLocationService);
  private loggingService = inject(LoggingService);

  getLocationWithinRadiusObservable(geoHazard: GeoHazard, lat: number, lng: number, radius: number) {
    return this.regobsAuthService.loggedInUser$.pipe(
      switchMap(
        () => this.apiLocationService.locationWithinRadius(lat, lng, radius, [geoHazard], 100) //TODO: sjekk om dette fungerer
      ),
      catchError((err) => {
        this.loggingService.error(err, DEBUG_TAG, 'Could not fetch loactions within radius');
        return of([]);
      })
    );
  }
}
