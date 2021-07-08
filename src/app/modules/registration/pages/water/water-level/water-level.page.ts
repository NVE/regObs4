import { Component, QueryList, ViewChildren } from '@angular/core';
import { BasePage } from '../../base.page';
import { RegistrationTid } from '@varsom-regobs-common/registration';
import { IsEmptyHelper } from '../../../../../core/helpers/is-empty.helper';
import { BasePageService } from '../../base-page-service';
import { ActivatedRoute } from '@angular/router';
import { WaterLevelMeasurementComponent } from '../../../components/water/water-level-measurement/water-level-measurement.component';

@Component({
  selector: 'app-water-level',
  templateUrl: './water-level.page.html',
  styleUrls: ['./water-level.page.scss']
})
export class WaterLevelPage extends BasePage {
  @ViewChildren(WaterLevelMeasurementComponent)
  private waterLevelMeasurements: QueryList<WaterLevelMeasurementComponent>;

  constructor(
    basePageService: BasePageService,
    activatedRoute: ActivatedRoute
  ) {
    super(RegistrationTid.WaterLevel2, basePageService, activatedRoute);
  }

  onInit() {
    if (
      !this.registration.request.WaterLevel2.WaterLevelMeasurement ||
      this.registration.request.WaterLevel2.WaterLevelMeasurement.length === 0
    ) {
      this.registration.request.WaterLevel2.WaterLevelMeasurement = [
        { DtMeasurementTime: undefined }
      ];
    }
  }

  onReset() {
    this.registration.request.WaterLevel2.WaterLevelMeasurement = [
      { DtMeasurementTime: undefined }
    ];
  }

  addWaterLevelMeasurement() {
    this.registration.request.WaterLevel2.WaterLevelMeasurement.push({
      DtMeasurementTime: undefined
    });
    this.save();
  }

  onBeforeLeave() {
    // Cleanup
    if (this.registration.request.WaterLevel2.WaterLevelMethodTID === 2) {
      this.registration.request.WaterLevel2.MarkingReferenceTID = null;
    }
    if (this.registration.request.WaterLevel2.MeasurementTypeTID !== 3) {
      this.registration.request.WaterLevel2.MeasuringToolDescription = undefined;
    }
    if (
      !(
        this.registration.request.WaterLevel2.WaterLevelMethodTID === 1 ||
        this.registration.request.WaterLevel2.MeasurementTypeTID === 1
      )
    ) {
      this.registration.request.WaterLevel2.Comment = undefined;
    }
    this.registration.request.WaterLevel2.WaterLevelMeasurement = (
      this.registration.request.WaterLevel2.WaterLevelMeasurement || []
    ).filter((item) => !IsEmptyHelper.isEmpty(item));
  }

  isValid() {
    for (const wl of this.waterLevelMeasurements.toArray()) {
      wl.showError();
    }
    return (
      this.waterLevelMeasurements &&
      !this.waterLevelMeasurements.some((x) => !x.isValid)
    );
  }
}
