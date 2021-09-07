import { OfflineTilesRegistry } from "./offline-tiles-registry"

describe('OfflineTilesRegistry', () => {
    let registry: OfflineTilesRegistry;
    
    beforeEach(() => {
        registry = new OfflineTilesRegistry();
        registry.add({
            name: 'test-package-1',
            maps: {
                'map-type-1': {
                    mapId: 'map-type-1',
                    rootTile: { x: 200, y: 201, z: 6 },
                    zMax: 12,
                    template: '/{z}/{x}/{y}.png',
                    url: 'path-to-offline-tiles-1/{z}/{x}/{y}.png'
                }
            }
        });

        // z: 7 = 400 - 401
        // z: 8 = 800 - 803
        // z: 9 = 1600 - 1607
        // z: 10 = 3200 - 3215
        // z: 11 = 6400 - 6431
        // z: 12 = 12800 - 12863
        // z: 13 = 25600 - 25727
        registry.add({
            name: 'test-package-2',
            maps: {
                'map-type-1': {
                    mapId: 'map-type-1',
                    rootTile: { x: 200, y: 200, z: 6 },
                    zMax: 12,
                    template: '/{z}/{x}/{y}.png',
                    url: 'path-to-offline-tiles-2/{z}/{x}/{y}.png'
                },
                'map-type-2': {
                    mapId: 'map-type-2',
                    rootTile: { x: 200, y: 200, z: 6 },
                    zMax: 12,
                    template: '/{z}/{x}/{y}.png',
                    url: 'path-to-offline-tiles-3/{z}/{x}/{y}.png'
                }
            }
        });
    });

    it('returns undefined for mapTypes not registered', () => {
        const url = registry.getUrl('test-package-not-registered', 401, 402, 7);
        expect(url).toBeUndefined();
    });

    it('can find a registered package', () => {
        const packageInfo = registry.findRegisteredPackage('map-type-1', 401, 402, 7);
        expect(packageInfo.url).toBe('path-to-offline-tiles-1/{z}/{x}/{y}.png');
    });
    
    it('does not find old packages after being cleared', () => {
        registry.clear();
        const packageInfo = registry.findRegisteredPackage('map-type-1', 401, 402, 7);
        expect(packageInfo).toBeUndefined(packageInfo);
    });

    it('finds the url for innermost zoom level near border', () => {
        const url = registry.getUrl('map-type-1', 12863, 12863, 12);
        expect(url).toBe('path-to-offline-tiles-2/{z}/{x}/{y}.png');
    });

    it('returns undefined when zoom levels are not overlapping', () => {
        const url = registry.getUrl('map-type-1', 25700, 25700, 13);
        expect(url).toBeUndefined();
    });

    it('can find a registered package valid for tiles above search tiles', () => {
        const p = registry.findRegisteredPackage('map-type-1', 25700, 25700, 13);
        expect(p.zMax).toBe(12);
    });

});

describe('OfflineTilesRegistry with overlapping packages', () => {
    let registry: OfflineTilesRegistry;
    
    beforeEach(() => {
        registry = new OfflineTilesRegistry();

        // z: 5 = 200 - 201
        // z: 6 = 400 - 403
        // z: 7 = 800 - 807
        // z: 8 = 1600 - 1615
        // z: 9 = 3200 - 3231
        // z: 10 = 6400 - 6463
        // z: 11 = 12800 - 12927
        // z: 12 = 25600 - 25855
        // z: 13 = 51200 - 51711
        registry.add({
            name: 'test-package-1',
            maps: {
                'map-type-1': {
                    mapId: 'map-type-1',
                    rootTile: { x: 100, y: 100, z: 4 },
                    zMax: 15,
                    template: '/{z}/{x}/{y}.png',
                    url: 'path-to-offline-tiles-1/{z}/{x}/{y}.png'
                }
            }
        });

        registry.add({
            name: 'test-package-2',
            maps: {
                'map-type-1': {
                    mapId: 'map-type-1',
                    rootTile: { x: 25, y: 25, z: 2 },
                    zMax: 12,
                    template: '/{z}/{x}/{y}.png',
                    url: 'path-to-offline-tiles-2/{z}/{x}/{y}.png'
                }
            }
        });
    });

    it('finds the correct url above the overlap', () => {
        const url = registry.getUrl('map-type-1', 51, 50, 3);
        expect(url).toBe('path-to-offline-tiles-2/{z}/{x}/{y}.png');
    });

    it('finds the correct package outside the overlap', () => {
        const url = registry.getUrl('map-type-1', 202, 202, 5);
        expect(url).toBe('path-to-offline-tiles-2/{z}/{x}/{y}.png');
    });

    it('finds one of the packages inside the overlap', () => {
        const url = registry.getUrl('map-type-1', 200, 200, 5);
        expect([
            'path-to-offline-tiles-1/{z}/{x}/{y}.png',
            'path-to-offline-tiles-2/{z}/{x}/{y}.png'
        ].includes(url)).toBeTrue();
    });

    it('finds the correct url below the overlap', () => {
        const url = registry.getUrl('map-type-1', 51500, 51650, 13);
        expect(url).toBe('path-to-offline-tiles-1/{z}/{x}/{y}.png');
    });

});