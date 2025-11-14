import { sortByName, sortByDate } from './plans.page';
import { GeoJSONItem } from 'src/app/core/services/geojson/geojson-item.model';

describe('sortByName', () => {
  it('sorts items alphabetically by name', () => {
    const items: GeoJSONItem[] = [
      { id: '1', name: 'Charlie' },
      { id: '2', name: 'Alice' },
      { id: '3', name: 'Bob' },
    ];
    const sorted = sortByName(items);
    expect(sorted.map((i) => i.name)).toEqual(['Alice', 'Bob', 'Charlie']);
  });

  it('does not mutate the original array', () => {
    const items: GeoJSONItem[] = [
      { id: '1', name: 'Charlie' },
      { id: '2', name: 'Alice' },
      { id: '3', name: 'Bob' },
    ];
    const itemsCopy = [...items];
    const sorted = sortByName(items);
    expect(sorted).not.toBe(items);
    expect(items).toEqual(itemsCopy);
  });
});

describe('sortByDate', () => {
  it('sorts items by date, newest first', () => {
    const items: GeoJSONItem[] = [
      { id: '1', name: 'A', date: 100 },
      { id: '2', name: 'B', date: 300 },
      { id: '3', name: 'C', date: 200 },
    ];
    const sorted = sortByDate(items);
    expect(sorted.map((i) => i.date)).toEqual([300, 200, 100]);
  });

  it('does not mutate the original array', () => {
    const items: GeoJSONItem[] = [
      { id: '1', name: 'A', date: 100 },
      { id: '2', name: 'B', date: 300 },
      { id: '3', name: 'C', date: 200 },
    ];
    const itemsCopy = [...items];
    const sorted = sortByDate(items);
    expect(sorted).not.toBe(items);
    expect(items).toEqual(itemsCopy);
  });

  it('handles items with missing dates', () => {
    const items: GeoJSONItem[] = [
      { id: '1', name: 'A', date: 100 },
      { id: '2', name: 'B' },
      { id: '3', name: 'C', date: 200 },
    ];
    const sorted = sortByDate(items);
    expect(sorted[0].date).toBe(200);
    expect(sorted[1].date).toBe(100);
    expect(sorted[2].date).toBeUndefined();
  });
});
