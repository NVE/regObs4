import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GeoIconComponent } from './geo-icon.component';
import { GeoHazard } from 'src/app/modules/common-core/models';
describe('GeoIconComponent', () => {
  let component: GeoIconComponent;
  let fixture: ComponentFixture<GeoIconComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [GeoIconComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeoIconComponent);
    fixture.componentRef.setInput('geoHazards', [GeoHazard.Snow]);
    component = fixture.componentInstance;
    fixture.autoDetectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('geoHazard snow should return class name snow', () => {
    fixture.componentRef.setInput('geoHazards', [GeoHazard.Snow]);
    // component.geoHazards = [GeoHazard.Snow];
    expect(component.geoClass()).toEqual('snow');
  });

  it('geoHazard water and dirt should return class name water-dirt', () => {
    fixture.componentRef.setInput('geoHazards', [GeoHazard.Water, GeoHazard.Soil]);
    // component.geoHazards = [GeoHazard.Water, GeoHazard.Soil];
    expect(component.geoClass()).toEqual('water-dirt');
  });

  it('geoHazard water and dirt should return svg src water_dirt.svg', () => {
    fixture.componentRef.setInput('geoHazards', [GeoHazard.Water, GeoHazard.Soil]);
    // component.geoHazards = [GeoHazard.Water, GeoHazard.Soil];
    expect(component.iconSrc()).toEqual('/assets/icon/water_dirt.svg');
  });
});
