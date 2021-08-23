import { of } from 'rxjs';
import { TestLoggingService } from '../../../modules/shared/services/logging/test-logging.service';
import { CompoundPackageMetadata } from '../../../pages/offline-map/metadata.model';
import { OfflineMapService } from './offline-map.service';
import { ProgressStep } from './progress-step.model';

describe('OfflineMapService', () => {
  let offlineMapService: OfflineMapService;

  it('progress value for 10% for download step of part 1 of 2 should be 0.10 / 4 =  0.025', () => {
    offlineMapService = new OfflineMapService(null, new TestLoggingService(), null, null, null, null, null, null);
    expect(offlineMapService.calculateTotalProgress(0.10, 0, 2, 'Downloading')).toBe(0.025);
  });

  it('progress value for 10% for unzip step of part 2 of 2 should be (0.10 / 4) + (3/4)  =  0.025 + 0.75 =  0.775', () => {
    offlineMapService = new OfflineMapService(null, new TestLoggingService(), null, null, null, null, null, null);
    expect(offlineMapService.calculateTotalProgress(0.10, 1, 2, 'Unzipping')).toBe(0.775);
  });

  it('get needed diskspace adds compression factor', async () => {
    offlineMapService = new OfflineMapService(null, new TestLoggingService(), null, null, null, null, null, null);
    const compoundPackage = new CompoundPackageMetadata([1,2,3]);
    compoundPackage.addPackage({ name: 'test', lastModified: null, xyz: null, urls: [], sizeInMib: 1.0  });
    
    const compressionFactor = 1.5;
    const expectedResult = 1.0 * 1024 * 1024 * compressionFactor;
    const result = await offlineMapService.getNeededDiskSpaceForPackage(compoundPackage, compressionFactor);
    expect(result).toBe(expectedResult);
  });

  it('get needed diskspace also sums up items in queue and currently downloading', async () => {
    offlineMapService = new OfflineMapService(null, new TestLoggingService(), null, null, null, null, null, null);
    const compoundPackage = new CompoundPackageMetadata([1,2,3]);
    compoundPackage.addPackage({ name: 'testpackage1-to-check', lastModified: null, xyz: null, urls: [], sizeInMib: 1.0  });

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
    const result = await offlineMapService.getNeededDiskSpaceForPackage(compoundPackage, compressionFactor);
    expect(result).toBe(expectedResult);
  });
});
