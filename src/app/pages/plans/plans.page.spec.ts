import { sortByName, sortByDate } from './plans.page';
import { GeoJSONItem } from 'src/app/core/services/geojson/geojson-item.model';

describe('sortByName', () => {
  it('sorts items alphabetically by name', () => {
    const items: GeoJSONItem[] = [
      { id: '1', name: 'Charlie', date: 1 },
      { id: '2', name: 'Alice', date: 1 },
      { id: '3', name: 'Bob', date: 1 },
    ];
    const sorted = sortByName(items);
    expect(sorted.map((i) => i.name)).toEqual(['Alice', 'Bob', 'Charlie']);
  });

  it('does not mutate the original array', () => {
    const items: GeoJSONItem[] = [
      { id: '1', name: 'Charlie', date: 1 },
      { id: '2', name: 'Alice', date: 1 },
      { id: '3', name: 'Bob', date: 1 },
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
});
