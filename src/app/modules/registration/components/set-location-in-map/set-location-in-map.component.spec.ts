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
    expect(mapCenterIsStableOrNotAvailable(null, null)).toBeTrue();
    expect(mapCenterIsStableOrNotAvailable(noCenter, noCenter)).toBeTrue();
    expect(mapCenterIsStableOrNotAvailable(null, noCenter)).toBeTrue();
    expect(mapCenterIsStableOrNotAvailable(london, null)).toBeTrue();
    expect(mapCenterIsStableOrNotAvailable(london, noCenter)).toBeTrue();

    // current map center has not changed
    expect(mapCenterIsStableOrNotAvailable(london, london)).toBeTrue();
    expect(mapCenterIsStableOrNotAvailable(london, nearLondon)).toBeTrue();

    // current map center has changed
    expect(mapCenterIsStableOrNotAvailable(noCenter, london)).toBeFalse();
    expect(mapCenterIsStableOrNotAvailable(null, london)).toBeFalse();
    expect(mapCenterIsStableOrNotAvailable(london, nve)).toBeFalse();
  });
});
