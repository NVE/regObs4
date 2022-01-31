import { Injectable } from '@angular/core';
import { LocationService as RegobsApiLocationService } from 'src/app/modules/common-regobs-api/services';
import { GeoHazard } from 'src/app/modules/common-core/models';
import { switchMap } from 'rxjs/operators';
import { RegobsAuthService } from '../../../modules/auth/services/regobs-auth.service';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  constructor(private regobsAuthService: RegobsAuthService, private apiLocationService: RegobsApiLocationService) {}

  getLocationWithinRadiusObservable(geoHazard: GeoHazard, lat: number, lng: number, radius: number) {
    return this.regobsAuthService.loggedInUser$.pipe(
      switchMap(() =>
        this.apiLocationService.LocationWithinRadius({
          geoHazardTypeIds: [geoHazard],
          radius,
          latitude: lat,
          longitude: lng,
          returnCount: 100
        })
      )
    );
  }
}
