import { TestBed } from '@angular/core/testing';
import { LatLng } from 'leaflet';
import { UrlParams } from 'src/app/core/services/search-criteria/url-params';

import { parseCoordinatesFromUrl } from './map.service';

describe('Parse coordinates from url', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should return correct MapView', () => {
    new UrlParams().set('nwLat', '70.79781234').apply();
    new UrlParams().set('nwLon', '21.4343').apply();
    new UrlParams().set('seLat', '67.5715').apply();
    new UrlParams().set('seLon', '33.1458').apply();

    const mapView = parseCoordinatesFromUrl(new URL(document.location.href));
    expect(mapView.bounds).toEqual(
      Object({ _southWest: new LatLng(67.5715, 21.4343), _northEast: new LatLng(70.79781234, 33.1458) })
    );
  });
});
