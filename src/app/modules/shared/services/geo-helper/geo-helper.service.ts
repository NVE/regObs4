import { Injectable } from '@angular/core';
import { GeoHazard } from '../../../../core/models/geo-hazard.enum';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GeoHelperService {

  constructor(private translateService: TranslateService) { }

  getTranslationKey(geoHazard: GeoHazard) {
    return `GEO_HAZARDS.${GeoHazard[geoHazard]}`.toUpperCase();
  }

  getTranslationKeys(geoHazards: GeoHazard[]) {
    if (geoHazards && geoHazards.length > 0) {
      return geoHazards.map((geoHazard) => this.getTranslationKey(geoHazard));
    }
    return [];
  }

  getName(geoHazards: GeoHazard[]): Observable<string> {
    const keys = this.getTranslationKeys(geoHazards);
    return this.translateService.get(keys).pipe(map((val) => keys.map((k) => val[k]).join(' / ')));
  }

  getAllGeoHazards(): GeoHazard[] {
    return Object.keys(GeoHazard).filter((key) => typeof GeoHazard[key] === 'number').map(key => GeoHazard[key]);
  }
}
