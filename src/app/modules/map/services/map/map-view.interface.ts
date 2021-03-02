import { Extent, Point } from '@arcgis/core/geometry';

export interface IMapView {
  bounds: Extent;
  center: Point;
  zoom: number;
}

// export class Point extends __esri.geometry.Point {
//   constructor(lat: number, lon: number) {
//     super({ latitude: lat, longitude: lon });
//   }

//   distanceTo(point: Point): number {
//     if (point != null) {
//       return super.distance(point);
//     }
//     return 0;
//   }
// }
