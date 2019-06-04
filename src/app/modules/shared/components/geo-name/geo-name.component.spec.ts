import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeoNameComponent } from './geo-name.component';

describe('GeoNameComponent', () => {
  let component: GeoNameComponent;
  let fixture: ComponentFixture<GeoNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeoNameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeoNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
