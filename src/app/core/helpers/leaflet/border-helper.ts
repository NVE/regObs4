import * as L from 'leaflet';
import { settings } from '../../../../settings';
import { of } from 'rxjs';
import { booleanContains, bboxPolygon, GeometryObject } from '@turf/turf';
export const SVALBARD_BOUNDS =
    L.latLngBounds(settings.map.elevation.svalbard.bbox.map((coordinate) => L.latLng(coordinate[0], coordinate[1])));
export const NORWEGIAN_BOUNDS = require('../../../../assets/json/world-topo-mix-border.json');
export const NORWEGIAN_LATLNG_BOUNDS = L.geoJSON(NORWEGIAN_BOUNDS).getBounds();

export class BorderHelper {

    static isInSvalbard(latLng: L.LatLng, bounds = SVALBARD_BOUNDS) {
        return bounds.contains(latLng);
    }

    static isInNorway(latLng: L.LatLng, bounds = NORWEGIAN_LATLNG_BOUNDS) {
        return bounds.contains(latLng);
    }

    static getLatLngBoundInSvalbardOrNorwayAsObservable(latLng: L.LatLng) {
        return this.isInSvalbard(latLng) ? of(({ inSvalbard: true, inNorway: true }))
            : (this.isInNorway(latLng) ? of(({ inSvalbard: false, inNorway: true }))
                : of(({ inSvalbard: false, inNorway: false })));
    }

    static toBBox(latLngBounds: L.LatLngBounds): [number, number, number, number] {
        return [
            latLngBounds.getSouthWest().lng, // minx
            latLngBounds.getSouthWest().lat, // miny
            latLngBounds.getNorthEast().lng, // maxx
            latLngBounds.getNorthEast().lat, // maxy
        ];
    }

    static isInside(latLngBounds: L.LatLngBounds, geometry: GeometryObject) {
        return booleanContains(geometry, bboxPolygon(this.toBBox(latLngBounds)));
    }
}
