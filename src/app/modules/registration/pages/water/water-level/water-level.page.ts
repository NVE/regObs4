import { Component, QueryList, ViewChildren } from '@angular/core';
import { BasePage } from '../../base.page';
import { RegistrationTid } from 'src/app/modules/common-registration/registration.models';
import { IsEmptyHelper } from '../../../../../core/helpers/is-empty.helper';
import { BasePageService } from '../../base-page-service';
import { ActivatedRoute } from '@angular/router';
import { WaterLevelMeasurementComponent } from '../../../components/water/water-level-measurement/water-level-measurement.component';

/**
 * Used to show water level measurements and to add measurements.
 * Contains a form for each specific measurement added (see WaterLevelMeasurementComponent)
 * and a button to add more measuremensts.
 */
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
      !this.draft.registration.WaterLevel2.WaterLevelMeasurement ||
      this.draft.registration.WaterLevel2.WaterLevelMeasurement.length === 0
    ) {
      this.draft.registration.WaterLevel2.WaterLevelMeasurement = [
        { DtMeasurementTime: undefined }
      ];
    }
  }

  onReset() {
    this.draft.registration.WaterLevel2.WaterLevelMeasurement = [
      { DtMeasurementTime: undefined }
    ];
  }

  addWaterLevelMeasurement() {
    this.draft.registration.WaterLevel2.WaterLevelMeasurement.push({
      DtMeasurementTime: undefined
    });
    this.save();
  }

  onBeforeLeave() {
    // Cleanup
    if (this.draft.registration.WaterLevel2.WaterLevelMethodTID === 2) {
      this.draft.registration.WaterLevel2.MarkingReferenceTID = null;
    }
    if (this.draft.registration.WaterLevel2.MeasurementTypeTID !== 3) {
      this.draft.registration.WaterLevel2.MeasuringToolDescription = undefined;
    }
    if (
      !(
        this.draft.registration.WaterLevel2.WaterLevelMethodTID === 1 ||
        this.draft.registration.WaterLevel2.MeasurementTypeTID === 1
      )
    ) {
      this.draft.registration.WaterLevel2.Comment = undefined;
    }
    this.draft.registration.WaterLevel2.WaterLevelMeasurement = (
      this.draft.registration.WaterLevel2.WaterLevelMeasurement || []
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
