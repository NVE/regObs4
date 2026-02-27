import { cleanFeatureCollection } from './geojson';
import { FeatureCollection, Point, LineString } from 'geojson';

describe('cleanFeatureCollection', () => {
  it('should remove all properties from features', () => {
    const fc: FeatureCollection = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: { type: 'Point', coordinates: [10, 60, 100] },
          properties: { foo: 'bar', keep: 123 },
        },
      ],
    };
    cleanFeatureCollection(fc);
    expect(fc.features[0].properties).toEqual({});
  });

  it('should handle all geometry types', () => {
    const fc: FeatureCollection = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: { type: 'Point', coordinates: [1.1234567, 2.2345678, 3.3456789] },
          properties: { a: 1 },
        },
        {
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: [
              [1.1234567, 2.2345678, 3.3],
              [4.4, 5.5, 6.6],
            ],
          },
          properties: { b: 2 },
        },
        {
          type: 'Feature',
          geometry: {
            type: 'Polygon',
            coordinates: [
              [
                [1.1234567, 2.2345678, 3.3],
                [4.4, 5.5, 6.6],
                [7.7, 8.8, 9.9],
                [1.1234567, 2.2345678, 3.3],
              ],
            ],
          },
          properties: { c: 3 },
        },
        {
          type: 'Feature',
          geometry: {
            type: 'MultiPoint',
            coordinates: [
              [1.1, 2.2, 3.3],
              [4.4, 5.5, 6.6],
            ],
          },
          properties: { d: 4 },
        },
        {
          type: 'Feature',
          geometry: {
            type: 'MultiLineString',
            coordinates: [
              [
                [1.1, 2.2, 3.3],
                [4.4, 5.5, 6.6],
              ],
              [
                [7.7, 8.8, 9.9],
                [10.1, 11.2, 12.3],
              ],
            ],
          },
          properties: { e: 5 },
        },
        {
          type: 'Feature',
          geometry: {
            type: 'MultiPolygon',
            coordinates: [
              [
                [
                  [1.1, 2.2, 3.3],
                  [4.4, 5.5, 6.6],
                  [7.7, 8.8, 9.9],
                  [1.1, 2.2, 3.3],
                ],
              ],
            ],
          },
          properties: { f: 6 },
        },
        {
          type: 'Feature',
          geometry: {
            type: 'GeometryCollection',
            geometries: [
              { type: 'Point', coordinates: [1.1234567, 2.2345678, 3.3] },
              {
                type: 'LineString',
                coordinates: [
                  [1.1, 2.2, 3.3],
                  [4.4, 5.5, 6.6],
                ],
              },
            ],
          },
          properties: { g: 7 },
        },
      ],
    };
    expect(() => cleanFeatureCollection(fc)).not.toThrow();
    // For nå tester denne bare at egenskapene er nullstilt
    // (og at ikke cleanFeatureCollection kræsjer for en eller flere av geometritypene)
    for (const feature of fc.features) {
      expect(feature.properties).toEqual({});
    }
  });

  it('should truncate coordinates to 6 decimals and remove height', () => {
    const fc: FeatureCollection = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: { type: 'Point', coordinates: [10.123456789, 60.987654321, 123.456] },
          properties: {},
        },
      ],
    };
    cleanFeatureCollection(fc);
    const coords = (fc.features[0].geometry as Point).coordinates;
    expect(coords.length).toBe(2);
    expect(coords[0]).toBeCloseTo(10.123457, 6);
    expect(coords[1]).toBeCloseTo(60.987654, 6);
  });

  it('should handle LineString and remove all properties', () => {
    const fc: FeatureCollection = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: [
              [10.123456789, 60.987654321, 123.456],
              [11.123456789, 61.987654321, 223.456],
            ],
          },
          properties: { foo: 'bar' },
        },
      ],
    };
    cleanFeatureCollection(fc);
    const coords = (fc.features[0].geometry as LineString).coordinates;
    expect(coords[0].length).toBe(2);
    expect(coords[1].length).toBe(2);
    expect(fc.features[0].properties).toEqual({});
  });

  it('should not throw on empty FeatureCollection', () => {
    const fc: FeatureCollection = { type: 'FeatureCollection', features: [] };
    expect(() => cleanFeatureCollection(fc)).not.toThrow();
  });
});
