import 'src/global-polyfill';
import { Observable } from 'rxjs';
import { DoWork, runWorker } from 'observable-webworker';
import { bboxPolygon, booleanContains, booleanWithin, point, buffer, booleanIntersects } from '@turf/turf';
import { GeoHazard } from 'src/app/modules/common-core/models';
import { map } from 'rxjs/operators';
import { settings } from '../../../../settings';
import avalancheRegions from './../../../../assets/json/varslingsomraader.json';
import regions from './../../../../assets/json/regions-simple-polygons.json';
import { IRegionInViewOutput, IRegionInViewInput } from './region-in-view-models';
import type { BBox, Feature, FeatureCollection, Geometry, GeometryCollection, MultiPolygon, Polygon } from 'geojson';

export class RegionInViewWorker implements DoWork<IRegionInViewInput, IRegionInViewOutput> {
  private isInsideOrIntersects(
    firstGeometry: Geometry | Feature<any>,
    secondGeometry: Geometry | Feature<any>
  ): boolean {
    return (
      booleanIntersects(firstGeometry, secondGeometry) ||
      booleanContains(firstGeometry, secondGeometry) ||
      booleanContains(secondGeometry, firstGeometry)
    );
  }

  private getRegions(geoHazards: GeoHazard[]): FeatureCollection {
    return <any>(geoHazards[0] === GeoHazard.Snow ? avalancheRegions : regions);
  }

  private getFeaturesInViewBounds(currentViewAsPolygon: Feature<Polygon>, geoHazards: GeoHazard[]) {
    return this.getRegions(geoHazards).features.filter((f) =>
      this.isInsideOrIntersects(<Polygon>f.geometry, currentViewAsPolygon.geometry)
    );
  }

  private getFeatureInPoint(
    coordinates: Geometry | Feature<any>,
    featuresInViewBounds: Feature<
      Geometry | GeometryCollection,
      {
        [name: string]: any;
      }
    >[]
  ): Feature<Geometry | GeometryCollection, { [name: string]: any }> {
    // Region that center view point is inside
    const firstAndBest = (featuresInViewBounds || []).find((f) =>
      booleanWithin(coordinates, <Feature<Polygon | MultiPolygon> | Polygon | MultiPolygon>f.geometry)
    );
    return firstAndBest;
  }

  public work(input$: Observable<IRegionInViewInput>): Observable<IRegionInViewOutput> {
    return input$.pipe(
      map((mapView) => {
        let regionInCenter: string = null;
        let regionsInViewBounds: string[] = [];
        let regionsInViewBuffer: string[] = [];
        const currentViewAsPolygon: Feature<Polygon> = bboxPolygon(<BBox>mapView.bounds);

        // Geojosn features that is inide or intersects with current view bounds
        const featuresInViewBounds = this.getFeaturesInViewBounds(currentViewAsPolygon, mapView.geoHazards);

        const featureName =
          mapView.geoHazards[0] === GeoHazard.Snow
            ? settings.services.warning.Snow.featureName
            : settings.services.warning.Soil.featureName;
        regionsInViewBounds = featuresInViewBounds.map((f) => f.properties[featureName].toString());

        const featureInCenter = this.getFeatureInPoint(
          point([mapView.center.lng, mapView.center.lat]),
          featuresInViewBounds
        );
        regionInCenter = featureInCenter ? featureInCenter.properties[featureName].toString() : null;

        // Geojson features that intersects or is inside a buffer of 150 km
        const buff = buffer(point([mapView.center.lng, mapView.center.lat]), 150, { units: 'kilometers' });
        regionsInViewBuffer = this.getRegions(mapView.geoHazards)
          .features.filter((f) => this.isInsideOrIntersects(<Polygon>f.geometry, buff.geometry))
          .map((f) => f.properties[featureName].toString());
        // const runtime = new Date().getTime() - start.getTime();
        // console.log(`[INFO][MapService] - Calculate regions took ${runtime} milliseconds`, result);
        return { regionInCenter, regionsInViewBounds, regionsInViewBuffer };
      })
    );
  }
}

runWorker(RegionInViewWorker);
