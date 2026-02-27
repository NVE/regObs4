import { latLng } from 'leaflet';
import { IMapView } from 'src/app/modules/map/services/map/map-view.interface';
import { mapCenterIsStableOrNotAvailable } from './set-location-in-map.component';

describe('SetLocationInMapComponent', () => {
  it('mapCenterIsStableOrNotAvailable() should work', () => {
    const london: IMapView = {
      bounds: null,
      zoom: null,
      center: latLng(0, 0),
    };
    const nearLondon: IMapView = {
      bounds: null,
      zoom: null,
      center: latLng(0.0000001, 0),
    };
    const nve: IMapView = {
      bounds: null,
      zoom: null,
      center: latLng(59.9315, 10.7192),
    };
    const noCenter: IMapView = {
      bounds: null,
      zoom: null,
      center: null,
    };

    // current map center is not available
    expect(mapCenterIsStableOrNotAvailable(null, null)).toBe(true);
    expect(mapCenterIsStableOrNotAvailable(noCenter, noCenter)).toBe(true);
    expect(mapCenterIsStableOrNotAvailable(null, noCenter)).toBe(true);
    expect(mapCenterIsStableOrNotAvailable(london, null)).toBe(true);
    expect(mapCenterIsStableOrNotAvailable(london, noCenter)).toBe(true);

    // current map center has not changed
    expect(mapCenterIsStableOrNotAvailable(london, london)).toBe(true);
    expect(mapCenterIsStableOrNotAvailable(london, nearLondon)).toBe(true);

    // current map center has changed
    expect(mapCenterIsStableOrNotAvailable(noCenter, london)).toBe(false);
    expect(mapCenterIsStableOrNotAvailable(null, london)).toBe(false);
    expect(mapCenterIsStableOrNotAvailable(london, nve)).toBe(false);
  });
});
