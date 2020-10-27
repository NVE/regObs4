import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeoIconComponent } from './geo-icon.component';
import { GeoHazard } from '../../../../core/models/geo-hazard.enum';
import { IonicModule } from '@ionic/angular';

describe('GeoIconComponent', () => {
  let component: GeoIconComponent;
  let fixture: ComponentFixture<GeoIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [IonicModule],
      declarations: [GeoIconComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeoIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('geoHazard snow should return class name snow', () => {
    component.geoHazards = [GeoHazard.Snow];
    expect(component.geoClass).toEqual('snow');
  });

  it('geoHazard water and dirt should return class name water-dirt', () => {
    component.geoHazards = [GeoHazard.Water, GeoHazard.Dirt];
    expect(component.geoClass).toEqual('water-dirt');
  });

  it('geoHazard water and dirt should return svg src water_dirt.svg', () => {
    component.geoHazards = [GeoHazard.Water, GeoHazard.Dirt];
    expect(component.iconSrc).toEqual('/assets/icon/water_dirt.svg');
  });
});
