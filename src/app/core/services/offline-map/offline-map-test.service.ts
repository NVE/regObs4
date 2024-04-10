import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { OfflineMapPackage } from './offline-map.model';
import { OfflineMapService } from './offline-map.service';
import { ProgressStep } from './progress-step.model';

const TEST_PACKAGES: OfflineMapPackage[] = [
  {
    name: '134-72-8',
    // Lagres i "completeFile" på telefonen.
    // completeFile inneholder kun totalt antall bytes
    // for en kartpakke
    size: 30_000_000,
    // Leses fra stat mtime på "completeFile" på telefonen.
    // Dette er dato i sekunder siden 1970
    // 1635827773 = 2021-11-02T04:36:13.000Z (ca)
    downloadComplete: 1635827773,

    maps: {
      statensKartverk: {
        mapId: 'statensKartverk',
        rootTile: { z: 8, x: 134, y: 72 },
        zMax: 14,
        template: '',
        // lastModified: '2021-11-02T04:36:13.500Z',
      },
      'steepness-outlet': {
        mapId: 'steepness-outlet',
        rootTile: { z: 8, x: 134, y: 72 },
        zMax: 14,
        template: '',
        // lastModified: '2021-11-02T04:36:13.500Z',
      },
    },
  },
  {
    name: '134-73-8',
    size: 32_000_000,
    downloadComplete: 1645827773,

    maps: {
      statensKartverk: {
        mapId: 'statensKartverk',
        rootTile: { z: 8, x: 134, y: 73 },
        zMax: 14,
        template: '',
        lastModified: '2024-04-06T04:36:13.500Z',
      },
      'steepness-outlet': {
        mapId: 'steepness-outlet',
        rootTile: { z: 8, x: 134, y: 73 },
        zMax: 14,
        template: '',
        lastModified: '2024-04-06T04:36:13.500Z',
      },
    },
  },
];

@Injectable({
  providedIn: 'root',
})
export class OfflineMapTestService extends OfflineMapService {
  packages$: Observable<OfflineMapPackage[]> = new BehaviorSubject([
    ...TEST_PACKAGES,
    ...TEST_PACKAGES,
    ...TEST_PACKAGES,
    ...TEST_PACKAGES,
  ]);

  availableDiskspace = {
    available: 500_000_000, // 500 MB
    used: TEST_PACKAGES.reduce((acc, p) => acc + p.size, 0),
  };

  downloadAndUnzipProgress$: Observable<OfflineMapPackage[]> = new BehaviorSubject([
    {
      name: '134-74-8',
      size: 203_456_000,
      progress: {
        percentage: 0.58,
        step: ProgressStep.download,
        description: 'Test...',
      },
      downloadStart: Date.now() / 1000,
      maps: {
        statensKartverk: {
          mapId: 'statensKartverk',
          rootTile: { z: 8, x: 134, y: 74 },
          zMax: 14,
          template: '',
        },
        'steepness-outlet': {
          mapId: 'steepness-outlet',
          rootTile: { z: 8, x: 134, y: 74 },
          zMax: 14,
          template: '',
        },
      },
    },
    {
      name: '134-75-8',
      size: 198_123_000,
      progress: {
        percentage: 0,
        step: ProgressStep.pending,
        description: 'In queue...',
      },
      downloadStart: Date.now() / 1000,
      maps: {
        statensKartverk: {
          mapId: 'statensKartverk',
          rootTile: { z: 8, x: 134, y: 75 },
          zMax: 14,
          template: '',
        },
        'steepness-outlet': {
          mapId: 'steepness-outlet',
          rootTile: { z: 8, x: 134, y: 75 },
          zMax: 14,
          template: '',
        },
      },
    },
    {
      name: '134-76-8',
      size: 198_123_000,
      error: new Error('Test error'),
      progress: {
        percentage: 0.78,
        step: ProgressStep.extractZip,
        description: 'Pakker ut..',
      },
      downloadStart: Date.now() / 1000,
      maps: {
        statensKartverk: {
          mapId: 'statensKartverk',
          rootTile: { z: 8, x: 134, y: 76 },
          zMax: 14,
          template: '',
        },
        'steepness-outlet': {
          mapId: 'steepness-outlet',
          rootTile: { z: 8, x: 134, y: 76 },
          zMax: 14,
          template: '',
        },
      },
    },
  ]);
}
