import { Component, OnInit } from '@angular/core';
import { RegistrationTid } from '../../../models/registrationTid.enum';
import { ActivatedRoute } from '@angular/router';
import { BasePage } from '../../base.page';
import { BasePageService } from '../../base-page-service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-avalanche-activity',
  templateUrl: './avalanche-activity.page.html',
  styleUrls: ['./avalanche-activity.page.scss'],
})
export class AvalancheActivityPage extends BasePage {

  constructor(
    basePageService: BasePageService,
    activatedRoute: ActivatedRoute,
    private modalController: ModalController,
  ) {
    super(RegistrationTid.AvalancheActivityObs2, basePageService, activatedRoute);
  }
}
