import { Component, OnInit } from '@angular/core';
import { BasePage } from '../../base.page';
import { RegistrationTid } from '../../../models/registrationTid.enum';
import { RegistrationService } from '../../../services/registration.service';

@Component({
  selector: 'app-water-level',
  templateUrl: './water-level.page.html',
  styleUrls: ['./water-level.page.scss'],
})
export class WaterLevelPage extends BasePage {

  constructor(
    registrationService: RegistrationService
  ) {
    super(RegistrationTid.WaterLevel2, registrationService);
  }

  // TODO: Cleanup registration. If registration.WaterLevel2.WaterLevelMethodTID === 2 remove MarkingReferenceTID etc,

}
