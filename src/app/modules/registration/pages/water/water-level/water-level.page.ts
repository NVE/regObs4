import { Component } from '@angular/core';
import { BasePage } from '../../base.page';
import { RegistrationTid } from '../../../models/registrationTid.enum';
import { IsEmptyHelper } from '../../../../../core/helpers/is-empty.helper';
import { BasePageService } from '../../base-page-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-water-level',
  templateUrl: './water-level.page.html',
  styleUrls: ['./water-level.page.scss'],
})
export class WaterLevelPage extends BasePage {

  constructor(
    basePageService: BasePageService,
    activatedRoute: ActivatedRoute,
  ) {
    super(RegistrationTid.WaterLevel2, basePageService, activatedRoute);
  }

  onInit() {
    if (!this.registration.request.WaterLevel2.WaterLevelMeasurement
      || this.registration.request.WaterLevel2.WaterLevelMeasurement.length === 0) {
      this.registration.request.WaterLevel2.WaterLevelMeasurement = [{}];
    }
  }

  onReset() {
    this.registration.request.WaterLevel2.WaterLevelMeasurement = [{}];
  }

  addWaterLevelMeasurement() {
    this.registration.request.WaterLevel2.WaterLevelMeasurement.push({});
  }

  onBeforeLeave() {
    // Cleanup
    if (this.registration.request.WaterLevel2.WaterLevelMethodTID === 2) {
      this.registration.request.WaterLevel2.MarkingReferenceTID = null;
    }
    this.registration.request.WaterLevel2.WaterLevelMeasurement =
      (this.registration.request.WaterLevel2.WaterLevelMeasurement || []).filter((item) => !IsEmptyHelper.isEmpty(item));
  }

}
