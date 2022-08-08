import { BasePageService } from '../../base-page-service';
import { IceThicknessPage } from './ice-thickness.page';
import { GeoHazard } from 'src/app/modules/common-core/models';

describe('IceThicknessPage', () => {
  let component: IceThicknessPage;

  beforeEach(() => {
    const basePageService = new BasePageService(null, null, null, null, null);
    component = new IceThicknessPage(basePageService, null, null, null);
    component.draft = {
      registration: {
        DtObsTime: new Date(2020, 0, 1).toISOString(),
        GeoHazardTID: GeoHazard.Ice,
        IceThickness: {}
      },
      uuid: null,
      syncStatus: null,
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

  it('validity check shouldn\'t modify values', () => {
    component.isWaterBefore = true;
    component.isWaterAfter = true;
    component.waterHeightBefore = 6;
    component.waterHeightAfter = 10;
    expect(component.isValid()).toBeTrue();
    expect(component.waterHeightBefore).toEqual(6);
    expect(component.waterHeightAfter).toEqual(10);
  });

  it('fills out registration correctly', () => {
    const iceThickness = component.draft.registration.IceThickness;
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
