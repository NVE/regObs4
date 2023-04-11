import { waitForAsync } from '@angular/core/testing';
import { DateRangeComponent } from './date-range.component';
import { UserSettingService } from '../../../../core/services/user-setting/user-setting.service';
import { SearchCriteriaService } from '../../../../core/services/search-criteria/search-criteria.service';
import {
  createTestMapService,
  TestMapService,
} from '../../../../core/services/search-criteria/search-criteria.service.spec';
import { MapService } from '../../../map/services/map/map.service';
import { TestLoggingService } from '../../../shared/services/logging/test-logging.service';

describe('DateRangeComponent', () => {
  let component: DateRangeComponent;
  let userSettingService: UserSettingService;
  let searchCriteriaService: SearchCriteriaService;
  let mapService: TestMapService;

  beforeEach(waitForAsync(() => {
    mapService = createTestMapService();
    userSettingService = new UserSettingService(null, null);
    searchCriteriaService = new SearchCriteriaService(
      userSettingService,
      mapService as unknown as MapService,
      new TestLoggingService()
    );
    component = new DateRangeComponent(searchCriteriaService, userSettingService);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
