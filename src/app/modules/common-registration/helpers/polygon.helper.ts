import L from 'leaflet';
import '@geoman-io/leaflet-geoman-free';
import { IPolygon, Polygon, PolygonArea } from '../../registration/models/polygon';

type PolygonType = 'total' | 'start' | 'end';

export function constructPolygon(extent: [number, number][], color: string, Type: typeof Polygon, title?: string) {
  return {
    title,
    active: Boolean(extent),
    polygon: extent
      ? new Type(
          extent.map(([lng, lat]) => [lat, lng]),
          { color }
        )
      : null,
    color,
  };
}

export function makePolygons(
  polygonType: PolygonType,
  polygon: IPolygon,
  relativeToLatLng?: L.LatLng,
  start?: L.LatLng,
  end?: L.LatLng
): IPolygon {
  if (!polygon?.polygon) {
    const totalCircle =
      start && end
        ? createCircleWithStartAndEnd(polygonType, start, end)
        : createCircleWithoutStartEnd(relativeToLatLng);
    polygon.polygon = new PolygonArea(L.PM.Utils.circleToPolygon(totalCircle, 5).getLatLngs());
  }
  return polygon;
}

const createCircleWithStartAndEnd = (polygonType: PolygonType, start: L.LatLng, end: L.LatLng): L.Circle => {
  switch (polygonType) {
    case 'total':
      return new L.Circle([(start.lat + end.lat) / 2, (start.lng + end.lng) / 2], {
        radius: start.distanceTo(end) / 2,
      });
    case 'start':
      return new L.Circle([start.lat + (end.lat - start.lat) / 6, start.lng + (end.lng - start.lng) / 6], {
        radius: start.distanceTo(end) / 6,
      });
    case 'end':
      return new L.Circle([end.lat + (start.lat - end.lat) / 6, end.lng + (start.lng - end.lng) / 6], {
        radius: start.distanceTo(end) / 6,
      });
  }
};

const createCircleWithoutStartEnd = (relativeToLatLng: L.LatLng): L.Circle => {
  const fallbackLatlng = L.latLng(59.1, 10.3);
  return new L.Circle(relativeToLatLng || fallbackLatlng, {
    radius: 150,
  });
};
