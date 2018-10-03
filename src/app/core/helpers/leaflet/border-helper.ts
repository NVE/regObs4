import * as norwegianBorder from '../../../../assets/norway-borders2.json';
import * as L from 'leaflet';
import * as leafletPip from '@mapbox/leaflet-pip';
import { settings } from '../../../../settings';

const NORWEGIAN_BORDER = L.geoJSON(norwegianBorder.default);
const SVALBARD_BOUNDS = L.latLngBounds(settings.map.elevation.svalbard.bbox.map((coordinate) => L.latLng(coordinate[0], coordinate[1])));

export class BorderHelper {
    static isInNorway(latLng: L.LatLng, border = NORWEGIAN_BORDER) {
        return leafletPip.pointInLayer(latLng, border).length > 0;
    }

    static isBoundsInNorway(latLngBounds: L.LatLngBounds, border = NORWEGIAN_BORDER) {
        return BorderHelper.isInNorway(latLngBounds.getNorthWest())
            && BorderHelper.isInNorway(latLngBounds.getNorthEast())
            && BorderHelper.isInNorway(latLngBounds.getSouthEast())
            && BorderHelper.isInNorway(latLngBounds.getSouthWest());
    }

    static isInSvalbard(latLng: L.LatLng, bounds = SVALBARD_BOUNDS) {
        return bounds.contains(latLng);
    }

    static isInsideStringBounds(latLng: L.LatLng, bounds: string) {
        return BorderHelper.stringToBounds(bounds).contains(latLng);
    }

    static isinView(center: L.LatLng, viewBounds: L.LatLngBounds, bounds: string) {
        const latLngBounds = BorderHelper.stringToBounds(bounds);
        return {
            center: latLngBounds.contains(center),
            viewBounds: (
                latLngBounds.contains(viewBounds) ||
                latLngBounds.intersects(viewBounds) ||
                viewBounds.contains(latLngBounds))
        };
    }

    static stringToBounds(bounds: string) {
        return L.latLngBounds(bounds.split(' ').map((latLngString) => {
            const latLngStringArray = latLngString.split(',');
            if (latLngStringArray.length === 2) {
                return L.latLng(parseFloat(latLngStringArray[0]), parseFloat(latLngStringArray[1]));
            } else {
                return null;
            }
        }).filter((latLng) => !!latLng));
    }
}
