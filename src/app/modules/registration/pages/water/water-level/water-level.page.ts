import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { BasePage } from '../../base.page';
import { RegistrationTid } from '../../../models/registrationTid.enum';
import { RegistrationService } from '../../../services/registration.service';
import { IsEmptyHelper } from '../../../../../core/helpers/is-empty.helper';

@Component({
  selector: 'app-water-level',
  templateUrl: './water-level.page.html',
  styleUrls: ['./water-level.page.scss'],
})
export class WaterLevelPage extends BasePage {

  constructor(
    registrationService: RegistrationService,
    changeDetectorRef: ChangeDetectorRef,
  ) {
    super(RegistrationTid.WaterLevel2, registrationService, changeDetectorRef);
  }

  onInit() {
    if (!this.registration.WaterLevel2.WaterLevelMeasurement || this.registration.WaterLevel2.WaterLevelMeasurement.length === 0) {
      this.registration.WaterLevel2.WaterLevelMeasurement = [{}];
    }
  }

  onReset() {
    this.registration.WaterLevel2.WaterLevelMeasurement = [{}];
  }

  addWaterLevelMeasurement() {
    this.registration.WaterLevel2.WaterLevelMeasurement.push({});
  }

  onBeforeLeave() {
    // Cleanup
    if (this.registration.WaterLevel2.WaterLevelMethodTID === 2) {
      this.registration.WaterLevel2.MarkingReferenceTID = null;
    }
    this.registration.WaterLevel2.WaterLevelMeasurement =
      this.registration.WaterLevel2.WaterLevelMeasurement.filter((item) => !IsEmptyHelper.isEmpty(item));
  }

}
