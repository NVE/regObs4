import * as L from "leaflet";
import "leaflet-draw"
export interface IPolygon {
  title: string;
  active: boolean;
  polygon: L.Polygon & {
    editing?: L.Draw.Polygon;
    options?: Partial<L.EditToolbar.EditHandlerOptions>
  };
  color: string;
}
