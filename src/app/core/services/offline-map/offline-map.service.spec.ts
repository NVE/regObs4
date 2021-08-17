import { TestLoggingService } from '../../../modules/shared/services/logging/test-logging.service';
import { OfflineMapService } from './offline-map.service';

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
});
