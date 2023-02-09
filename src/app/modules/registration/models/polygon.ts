export interface IPolygon {
  title: string;
  active: boolean;
  polygon: L.Polygon & { editing?: { enable: () => void; disable: () => void; enabled: () => boolean } };
  color: string;
}
