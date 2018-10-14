import * as norwegianBorder from '../../../../assets/norway-borders2.json';
import * as avalancheRegions from '../../../../assets/varslingsomraader.json';
import * as fylkesgrenser from '../../../../assets/fylkesgrenser.json';
import * as L from 'leaflet';
import * as leafletPip from '@mapbox/leaflet-pip';
import { settings } from '../../../../settings';
import { GeoHazard } from '../../models/geo-hazard.enum';
import { GeometryObject, Feature } from 'geojson';
import * as turf from '@turf/turf';

const NORWEGIAN_BORDER = L.geoJSON(norwegianBorder.default);
const SVALBARD_BOUNDS = L.latLngBounds(settings.map.elevation.svalbard.bbox.map((coordinate) => L.latLng(coordinate[0], coordinate[1])));

export class BorderHelper {
    static isInNorway(latLng: L.LatLng, border = NORWEGIAN_BORDER) {
        return leafletPip.pointInLayer(latLng, border).length > 0;
    }

    static isBoundsInNorway(latLngBounds: L.LatLngBounds, border = NORWEGIAN_BORDER) {
        return BorderHelper.isInNorway(latLngBounds.getNorthWest(), border)
            && BorderHelper.isInNorway(latLngBounds.getNorthEast(), border)
            && BorderHelper.isInNorway(latLngBounds.getSouthEast(), border)
            && BorderHelper.isInNorway(latLngBounds.getSouthWest(), border);
    }

    static isInSvalbard(latLng: L.LatLng, bounds = SVALBARD_BOUNDS) {
        return bounds.contains(latLng);
    }

    // static isInsideStringBounds(latLng: L.LatLng, bounds: string) {
    //     return BorderHelper.stringToBounds(bounds).contains(latLng);
    // }

    // static isinView(center: L.LatLng, viewBounds: L.LatLngBounds, bounds: string) {
    //     const latLngBounds = BorderHelper.stringToBounds(bounds);
    //     return {
    //         center: latLngBounds.contains(center),
    //         viewBounds: (
    //             latLngBounds.contains(viewBounds) ||
    //             latLngBounds.intersects(viewBounds) ||
    //             viewBounds.contains(latLngBounds))
    //     };
    // }

    // static getGroupInView(geoHazard: GeoHazard, center: L.LatLng, viewBounds: L.LatLngBounds) {
    //     const features = (geoHazard === GeoHazard.Snow) ?
    //         BorderHelper.getFeaturesFromJson(avalancheRegions.default) :
    //         BorderHelper.getFeaturesFromJson(fylkesgrenser.default);
    //     const featureName = (geoHazard === GeoHazard.Snow) ? 'OMRAADEID' : 'fylkesnummer';
    //     const inViewBounds = BorderHelper.getInViewBounds(features, viewBounds, featureName);
    //     const inCenter = BorderHelper.getInlatLng(features, center, featureName);

    //     return { center: inCenter, viewBounds: inViewBounds };
    // }

    // static getInViewBounds(features: Array<Feature<GeometryObject, any>>, viewBounds: L.LatLngBounds, featureName: string) {
    //     return features.filter((r) => {
    //         const featurePolygon = r.geometry as turf.Polygon;
    //         const currentViewAsPolygon = this.boundsToGeoPolygon(viewBounds);
    //         return turf.intersect(featurePolygon, currentViewAsPolygon) ||
    //             turf.booleanContains(featurePolygon, currentViewAsPolygon) ||
    //             turf.booleanContains(currentViewAsPolygon, featurePolygon);
    //     }).map((feature) => {
    //         return feature.properties[featureName].toString();
    //     });
    // }

    // static getInlatLng(features: Array<Feature<GeometryObject, any>>, latLng: L.LatLng, featureName: string) {
    //     return features.filter((r) => {
    //         const featurePolygon = r.geometry as turf.Polygon;
    //         return turf.inside([latLng.lng, latLng.lat], featurePolygon);
    //     }).map((feature) => {
    //         return feature.properties[featureName].toString();
    //     });
    // }

    // static stringToBounds(bounds: string) {
    //     return L.latLngBounds(bounds.split(' ').map((latLngString) => {
    //         const latLngStringArray = latLngString.split(',');
    //         if (latLngStringArray.length === 2) {
    //             return L.latLng(parseFloat(latLngStringArray[0]), parseFloat(latLngStringArray[1]));
    //         } else {
    //             return null;
    //         }
    //     }).filter((latLng) => !!latLng));
    // }

    // static getFeaturesFromJson(geoJson: any) {
    //     const features: Array<Feature<GeometryObject, any>> = [];
    //     L.geoJSON(geoJson, {
    //         onEachFeature: (feature) => {
    //             features.push(feature);
    //         }
    //     });
    //     return features;
    // }

    // static boundsToGeoPolygon(bounds: L.LatLngBounds) {
    //     return turf.polygon([[
    //         [bounds.getNorthWest().lng, bounds.getNorthWest().lat],
    //         [bounds.getNorthEast().lng, bounds.getNorthEast().lat],
    //         [bounds.getSouthEast().lng, bounds.getSouthEast().lat],
    //         [bounds.getSouthWest().lng, bounds.getSouthWest().lat],
    //         [bounds.getNorthWest().lng, bounds.getNorthWest().lat],
    //     ]]);
    // }
}
