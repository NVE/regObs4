import { TestBed } from '@angular/core/testing';
import { LatLng } from 'leaflet';

import { parseCoordinatesFromUrl } from './map.service';

describe('Parse coordinates from url', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should return correct MapView', () => {
    const mapView = parseCoordinatesFromUrl(
      new URL('https://regobs.no?nwLat=70.79781234&nwLon=21.4343&seLat=67.5715&seLon=33.1458')
    );
    expect(mapView.bounds.getSouthWest().lat).toEqual(67.5715);
    expect(mapView.bounds.getSouthWest().lng).toEqual(21.4343);
    expect(mapView.bounds.getNorthEast().lat).toEqual(70.79781234);
    expect(mapView.bounds.getNorthEast().lng).toEqual(33.1458);
  });
});
