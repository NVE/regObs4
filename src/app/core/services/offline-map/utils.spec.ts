import { CompoundPackage } from 'src/app/pages/offline-map/metadata.model';
import { OfflineMapPackage, OfflineTilesMetadata } from './offline-map.model';
import { isPackageOutdated } from './utils';

describe('isPackageOutdated', () => {
  const packageOnServer = new CompoundPackage({
    bbox: [1, 2, 3, 4],
    id: 'pakke-1',
    xyz: [1, 2, 3],
    sizeInMib: 1.0,
    maps: [
      {
        name: '1',
        lastModified: '2021-01-01T00:00:01Z',
        urls: [],
        sizeInMib: 0,
      },
      {
        name: '2',
        lastModified: '2021-01-03T00:00:01Z',
        urls: [],
        sizeInMib: 0,
      },
    ]
  });

  it('burde returnere true hvis pakka på server er nyere enn nedlasta pakke', () => {
    const outdatedDownloadedPackage: OfflineMapPackage = {
      name: 'utdatert-nedlasta-pakke',
      maps: {
        '1': {
          mapId: '1',
          rootTile: { z: 1, x: 2, y: 3 },
          zMax: 4,
          template: '1-2-3',
          lastModified: '2021-01-01T00:00:01Z',
        },
        '2': {
          mapId: '2',
          rootTile: { z: 1, x: 2, y: 3 },
          zMax: 4,
          template: '1-2-3',
          lastModified: '2021-01-02T00:00:01Z',
        },
      }
    };
    expect(isPackageOutdated(outdatedDownloadedPackage, packageOnServer)).toBe(true);
  });

  it('burde returnere true hvis nedlastet kartpakke mangler produksjonsdato (dvs. at den er produsert før vi innførte produksjonsdato)', () => {
    const mapWithoutLastModified: OfflineTilesMetadata = {
      mapId: '1',
      rootTile: { z: 1, x: 2, y: 3 },
      zMax: 4,
      template: '1-2-3',
    };

    const mapWithEmptyLastModified: OfflineTilesMetadata = {
      mapId: '1',
      rootTile: { z: 1, x: 2, y: 3 },
      zMax: 4,
      template: '1-2-3',
      lastModified: ''
    };

    const oldDownloadedPackage: OfflineMapPackage = {
      name: 'nedlastet-pakke-uten-produksjonsdato',
      maps: {
        '1': mapWithoutLastModified,
        '2': mapWithEmptyLastModified
      }
    };

    expect(isPackageOutdated(oldDownloadedPackage, packageOnServer)).toBe(true);

    const downloadedPackageWithoutMaps: OfflineMapPackage = {
      name: 'nedlastet-pakke-uten-produksjonsdato',
      maps: {},
    };
    expect(isPackageOutdated(downloadedPackageWithoutMaps, packageOnServer)).toBe(true);
  });

  it('Burde returnere false hvis pakka på server ikke er nyere enn nedlasta pakke', () => {
    const freshDownloadedPackage: OfflineMapPackage = {
      name: 'fersk-nedlasta-pakke',
      maps: {
        '1': {
          mapId: '1',
          rootTile: { z: 1, x: 2, y: 3 },
          zMax: 4,
          template: '1-2-3',
          lastModified: '2021-01-01T00:00:01Z',
        },
        '2': {
          mapId: '1',
          rootTile: { z: 1, x: 2, y: 3 },
          zMax: 4,
          template: '1-2-3',
          lastModified: '2021-01-03T00:00:01Z'
        },
      },
    }
    expect(isPackageOutdated(freshDownloadedPackage, packageOnServer)).toBe(false);
  });
});
