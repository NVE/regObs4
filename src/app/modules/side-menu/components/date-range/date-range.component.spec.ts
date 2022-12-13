import { waitForAsync } from '@angular/core/testing';
import { DateRangeComponent } from './date-range.component';

describe('DateRangeComponent', () => {
  let component: DateRangeComponent;

  beforeEach(waitForAsync(() => {
    component = new DateRangeComponent(null, null, null);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
