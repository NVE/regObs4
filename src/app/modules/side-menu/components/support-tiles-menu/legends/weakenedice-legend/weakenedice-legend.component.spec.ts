import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeakenediceLegendComponent } from './weakenedice-legend.component';

describe('WeakenediceLegendComponent', () => {
  let component: WeakenediceLegendComponent;
  let fixture: ComponentFixture<WeakenediceLegendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeakenediceLegendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeakenediceLegendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
