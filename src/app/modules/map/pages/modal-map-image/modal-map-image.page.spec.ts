import { CUSTOM_ELEMENTS_SCHEMA, importProvidersFrom } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalMapImagePage } from './modal-map-image.page';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { provideTranslateService } from '@ngx-translate/core';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { ImageLocation } from 'src/app/components/img-swiper/image-location.model';
import L from 'leaflet';
import { GeoHazard } from 'src/app/modules/common-core/models';

describe('ModalMapImagePage', () => {
  let component: ModalMapImagePage;
  let fixture: ComponentFixture<ModalMapImagePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [
        provideIonicAngular(),
        provideTranslateService(),
        importProvidersFrom([CommonModule, FormsModule, LeafletModule]),
      ],
      imports: [ModalMapImagePage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalMapImagePage);
    const location: ImageLocation = {
      latLng: L.latLng([0, 0]),
      geoHazard: GeoHazard.Snow,
    };
    fixture.componentRef.setInput('location', location);
    fixture.autoDetectChanges();
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
