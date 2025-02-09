import { TestBed } from '@angular/core/testing';
import { IceThicknessPage } from './ice-thickness.page';
import { GeoHazard } from 'src/app/modules/common-core/models';
import { provideTestLogger } from 'src/app/modules/shared/services/logging/test-logging.service';
import { DraftRepositoryService } from 'src/app/core/services/draft/draft-repository.service';
import { NewAttachmentService } from 'src/app/modules/common-registration/registration.services';
import { provideTranslateService } from '@ngx-translate/core';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { provideRouter } from '@angular/router';
import { SyncStatus } from 'src/app/modules/common-registration/registration.models';
import { IceThicknessEditModel } from 'src/app/modules/common-regobs-api';

describe('IceThicknessPage', () => {
  let component: IceThicknessPage;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        provideIonicAngular(),
        provideTestLogger(),
        provideTranslateService(),
        { provide: DraftRepositoryService, useValue: null },
        { provide: NewAttachmentService, useValue: null },
      ],
    });
    const fixture = TestBed.createComponent(IceThicknessPage);
    component = fixture.componentInstance;

    component.draft = {
      registration: {
        DtObsTime: new Date(2020, 0, 1).toISOString(),
        GeoHazardTID: GeoHazard.Ice,
        IceThickness: {},
      },
      uuid: 'test',
      syncStatus: SyncStatus.Draft,
      simpleMode: false,
    };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('empty icethickness is valid', () => {
    expect(component.isValid()).toBeTrue();
  });

  it('isWaterBefore without waterheightbefore should be invalid', () => {
    component.isWaterBefore = true;
    expect(component.isValid()).toBeFalse();
  });

  it('isWaterAfter without waterheightafter should be invalid', () => {
    component.isWaterAfter = true;
    expect(component.isValid()).toBeFalse();
  });

  it("validity check shouldn't modify values", () => {
    component.isWaterBefore = true;
    component.isWaterAfter = true;
    component.waterHeightBefore = 6;
    component.waterHeightAfter = 10;
    expect(component.isValid()).toBeTrue();
    expect(component.waterHeightBefore).toEqual(6);
    expect(component.waterHeightAfter).toEqual(10);
  });

  it('fills out registration correctly', () => {
    const iceThickness = component.draft.registration.IceThickness as IceThicknessEditModel;
    component.isWaterBefore = undefined;
    component.waterHeightBefore = 10;
    component.isWaterAfter = undefined;
    component.waterHeightAfter = 12;
    component.waterDepthAfter = 15;
    expect(component.isValid()).toBeTrue();
    expect(iceThickness.IceHeightBefore).toBeUndefined();
    expect(iceThickness.IceHeightAfter).toBeUndefined();

    component.isWaterBefore = true;
    component.isWaterAfter = true;
    expect(component.isValid()).toBeTrue();
    expect(iceThickness.IceHeightBefore).toEqual(-10);
    expect(iceThickness.IceHeightAfter).toEqual(-12);

    component.isWaterBefore = false;
    component.isWaterAfter = false;
    expect(component.isValid()).toBeTrue();
    expect(iceThickness.IceHeightBefore).toEqual(0);
    expect(iceThickness.IceHeightAfter).toEqual(15);
  });
});
