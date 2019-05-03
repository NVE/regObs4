import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnowDensityComponent } from './snow-density.component';

describe('SnowDensityComponent', () => {
  let component: SnowDensityComponent;
  let fixture: ComponentFixture<SnowDensityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnowDensityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnowDensityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
