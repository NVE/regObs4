import { Injectable } from '@angular/core';
import { LocationService as RegobsApiLocationService } from '../../../modules/regobs-api/services';
import { GeoHazard } from '../../models/geo-hazard.enum';
import { switchMap } from 'rxjs/operators';
import { RegobsAuthService } from '../../../modules/auth/services/regobs-auth.service';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  constructor(
    private regobsAuthService: RegobsAuthService,
    private apiLocationService: RegobsApiLocationService
  ) {}

  getLocationWithinRadiusObservable(
    geoHazard: GeoHazard,
    lat: number,
    lng: number,
    radius: number
  ) {
    return this.regobsAuthService.loggedInUser$.pipe(
      switchMap((loggedInUser) =>
        this.apiLocationService.LocationWithinRadius({
          geoHazardTypeIds: [geoHazard],
          radius,
          latitude: lat,
          longitude: lng,
          observerGuid: loggedInUser.isLoggedIn ? loggedInUser.user.Guid : null,
          returnCount: 100
        })
      )
    );
  }
}
