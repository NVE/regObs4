import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExposedHeightComponent } from './exposed-height.component';

describe('ExposedHeightComponent', () => {
  let component: ExposedHeightComponent;
  let fixture: ComponentFixture<ExposedHeightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExposedHeightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExposedHeightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
