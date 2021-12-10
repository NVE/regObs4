import { Platform } from '@ionic/angular';
import { Platforms } from '@ionic/core';
import { of } from 'rxjs';
import { TestLoggingService } from '../../../modules/shared/services/logging/test-logging.service';
import { CompoundPackage } from '../../../pages/offline-map/metadata.model';
import { OfflineMapService } from './offline-map.service';
import { ProgressStep } from './progress-step.model';

describe('OfflineMapService', () => {
  let offlineMapService: OfflineMapService;
  let platformMock: Platform;

  beforeEach(() => {
    platformMock = jasmine.createSpyObj('Platform', {
      is: (platformName: Platforms) => false
    });
    offlineMapService = new OfflineMapService(new TestLoggingService(), null, null, platformMock, null, null, null);
  });

  it('progress value for 10% for download step of part 1 of 2 should be 0.10 / 4 =  0.025', () => {
    expect(offlineMapService.calculateTotalProgress(0.10, 0, 2, 'Downloading')).toBe(0.025);
  });

  it('progress value for 10% for unzip step of part 2 of 2 should be (0.10 / 4) + (3/4)  =  0.025 + 0.75 =  0.775', () => {
    expect(offlineMapService.calculateTotalProgress(0.10, 1, 2, 'Unzipping')).toBe(0.775);
  });

  it('get needed diskspace adds compression factor', async () => {
    const cp = new CompoundPackage({
      bbox: [1, 2, 3, 4],
      id: 'test',
      xyz: [1, 2, 3],
      sizeInMib: 1.0,
      maps: []
    });

    const compressionFactor = 1.5;
    const expectedResult = 1.0 * 1024 * 1024 * compressionFactor;
    const result = await offlineMapService.getNeededDiskSpaceForPackage(cp, compressionFactor);
    expect(result).toBe(expectedResult);
  });

  it('get needed diskspace also sums up items in queue and currently downloading', async () => {
    const cp = new CompoundPackage({
      bbox: [1, 2, 3, 4],
      id: 'test',
      xyz: [1, 2, 3],
      sizeInMib: 1.0,
      maps: []
    });

    offlineMapService.downloadAndUnzipProgress$ = of([
      {
        name: 'testpackage2-in-queue',
        size: 1.0 * 1024 * 1024,
        progress: { step: ProgressStep.pending,  percentage: 0, description: 'test-package in queue'  },
        downloadStart: new Date().getTime() / 1000,
        downloadComplete: null,
        error: null,
        maps: {},
      },
      {
        name: 'testpackage3-in-download-progress',
        size: 1.0 * 1024 * 1024,
        progress: { step: ProgressStep.download,  percentage: 0.2, description: 'test-package downloading'  },
        downloadStart: new Date().getTime() / 1000,
        downloadComplete: null,
        error: null,
        maps: {},
      }
    ]);

    const compressionFactor = 1.1;
    const expectedResult = 3.0 * 1024 * 1024 * compressionFactor; // Expects 3 packages of each 1.0 MiB to be the sum needed
    const result = await offlineMapService.getNeededDiskSpaceForPackage(cp, compressionFactor);
    expect(result).toBe(expectedResult);
  });
});
