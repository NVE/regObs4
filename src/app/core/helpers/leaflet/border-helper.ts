// import * as norwegianBorder from '../../../../assets/norway-borders2.json';
import * as L from 'leaflet';
import * as leafletPip from '@mapbox/leaflet-pip';
import { settings } from '../../../../settings';
import { Observable, Observer, of } from 'rxjs';
import { createWorker } from 'typed-web-workers';
import { switchMap, map } from 'rxjs/operators';

const NORWEGIAN_BORDER = require('../../../../assets/norway-borders2.json');
const SVALBARD_BOUNDS = L.latLngBounds(settings.map.elevation.svalbard.bbox.map((coordinate) => L.latLng(coordinate[0], coordinate[1])));

export class BorderHelper {

    // static isInNorway(latLng: L.LatLng, border = NORWEGIAN_BORDER) {
    //     return leafletPip.pointInLayer(latLng, L.geoJSON(border)).length > 0;
    // }

    static isInSvalbard(latLng: L.LatLng, bounds = SVALBARD_BOUNDS) {
        return bounds.contains(latLng);
    }

    static getLatLngBoundInSvalbardOrNorwayAsObservable(latLng: L.LatLng) {
        return BorderHelper.isInSvalbard(latLng) ? of(({ inSvalbard: true, inNorway: true }))
            : BorderHelper.isLatLngInNorwayAsObservable(latLng)
                .pipe(map((inNorway) => ({ inSvalbard: false, inNorway })));
    }

    static isBoundsInNorway(latLngBounds: L.LatLngBounds, border = NORWEGIAN_BORDER) {
        return this.isBoundsInNorwayAsObservable(latLngBounds, border).toPromise();
    }

    static isBoundsInNorwayAsObservable(latLngBounds: L.LatLngBounds, border = NORWEGIAN_BORDER): Observable<boolean> {
        return Observable.create((observer: Observer<boolean>) => {
            const typedWorker = createWorker(this.isBoundsInNorwayWorkFunc, (msg) => {
                observer.next(msg);
                observer.complete();
            });
            const input = {
                baseUrl: document.location.protocol + '//' + document.location.host,
                bbox: this.toBBox(latLngBounds),
                border: border
            };
            typedWorker.postMessage(input);
            return () => typedWorker ? typedWorker.terminate() : null;
        });
    }

    static isLatLngInNorwayAsObservable(latLng: L.LatLng, border = NORWEGIAN_BORDER): Observable<boolean> {
        return Observable.create((observer: Observer<boolean>) => {
            const typedWorker = createWorker(this.isLatLngInNorwayWorkFunc, (msg) => {
                observer.next(msg);
                observer.complete();
            });
            const input = {
                baseUrl: document.location.protocol + '//' + document.location.host,
                latLng: { lat: latLng.lat, lng: latLng.lng },
                border: border
            };
            typedWorker.postMessage(input);
            return () => typedWorker ? typedWorker.terminate() : null;
        });
    }

    // NOTE: This function is running as web job and connot have any dependencies!
    static isBoundsInNorwayWorkFunc(
        input: {
            baseUrl: string;
            bbox: [number, number, number, number];
            border: any;
        },
        callback: (_: boolean) => void) {
        const that = <any>self;
        that.importScripts(`${input.baseUrl}/turf/turf.min.js`);
        const bboxPolygon = that.turf.bboxPolygon(input.bbox);
        const result = that.turf.booleanContains(input.border.geometry, bboxPolygon.geometry);
        callback(result);
    }

    static isLatLngInNorwayWorkFunc(
        input: {
            baseUrl: string;
            latLng: { lat: number, lng: number };
            border: any;
        },
        callback: (_: boolean) => void) {
        const that = <any>self;
        that.importScripts(`${input.baseUrl}/turf/turf.min.js`);
        const result = that.turf.inside([input.latLng.lng, input.latLng.lat], input.border.geometry);
        callback(result);
    }

    static toBBox(latLngBounds: L.LatLngBounds): [number, number, number, number] {
        return [
            latLngBounds.getSouthWest().lng, // minx
            latLngBounds.getSouthWest().lat, // miny
            latLngBounds.getNorthEast().lng, // maxx
            latLngBounds.getNorthEast().lat, // maxy
        ];
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
