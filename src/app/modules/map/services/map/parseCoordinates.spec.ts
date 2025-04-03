import { parseCoordinatesFromSearchParams } from './map.service';

describe('Parse coordinates from url', () => {
  // Vi tester både dagens url-parametre og de gamle som er brukt i appen tidligere
  [
    'nwLat=70.79781234&nwLon=21.4343&seLat=67.5715&seLon=33.1458',
    'NWLat=70.79781234&NWLon=21.4343&SELat=67.5715&SELon=33.1458',
  ].forEach((params) => {
    it(`should parse coordinates from ${params}`, () => {
      const url = new URL('https://regobs.no?' + params);
      const mapView = parseCoordinatesFromSearchParams(url.searchParams);
      expect(mapView?.bounds.getSouthWest().lat).toEqual(67.5715);
      expect(mapView?.bounds.getSouthWest().lng).toEqual(21.4343);
      expect(mapView?.bounds.getNorthEast().lat).toEqual(70.79781234);
      expect(mapView?.bounds.getNorthEast().lng).toEqual(33.1458);
    });
  });
});
