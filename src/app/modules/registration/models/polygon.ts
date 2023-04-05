import * as L from 'leaflet';
import 'leaflet-draw';
import { settings } from 'src/settings';

export const Polygon = L.Polygon.extend({
  options: {
    poly: {
      allowIntersection: false,
    },
  },
}) as unknown as typeof L.Polygon;

export const PolygonArea = L.Polygon.extend({
  options: {
    poly: {
      drawError: {
        color: settings.map.extentColor,
      },
    },
  },
}) as unknown as typeof L.Polygon;

export interface IPolygon {
  title: string;
  active: boolean;
  polygon: L.Polygon & {
    editing?: L.Draw.Polygon;
    options?: Partial<L.EditToolbar.EditHandlerOptions>;
  };
  color: string;
}
