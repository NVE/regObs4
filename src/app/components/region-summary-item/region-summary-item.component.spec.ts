import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionSummaryItemComponent } from './region-summary-item.component';

describe('RegionSummaryItemComponent', () => {
  let component: RegionSummaryItemComponent;
  let fixture: ComponentFixture<RegionSummaryItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegionSummaryItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionSummaryItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
