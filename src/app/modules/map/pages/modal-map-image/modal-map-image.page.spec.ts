import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ModalMapImagePage } from './modal-map-image.page';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import * as L from 'leaflet';

describe('ModalMapImagePage', () => {
  let component: ModalMapImagePage;
  let fixture: ComponentFixture<ModalMapImagePage>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          CommonModule,
          FormsModule,
          IonicModule,
          TranslateModule,
          LeafletModule
        ],
        declarations: [ModalMapImagePage],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalMapImagePage);
    component = fixture.componentInstance;
    component.location = { latLng:  L.latLng(62,8), geoHazard: 10 }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
