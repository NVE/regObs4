import { Injectable } from '@angular/core';
import { LocationService as RegobsApiLocationService } from '../../../modules/regobs-api/services';
import { GeoHazard } from '../../models/geo-hazard.enum';
import { switchMap } from 'rxjs/operators';
import { LoginService } from '../../../modules/login/services/login.service';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  constructor(
    private loginService: LoginService,
    private apiLocationService: RegobsApiLocationService) {
  }

  getLocationWithinRadiusObservable(geoHazard: GeoHazard, lat: number, lng: number, radius: number) {
    return this.loginService.loggedInUser$
      .pipe(switchMap((loggedInUser) => this.apiLocationService.LocationWithinRadius({
        geoHazardTypeIds: [geoHazard],
        radius,
        latitude: lat,
        longitude: lng,
        observerGuid: loggedInUser.isLoggedIn ? loggedInUser.user.Guid : null,
        returnCount: 100,
      })));
  }
}
