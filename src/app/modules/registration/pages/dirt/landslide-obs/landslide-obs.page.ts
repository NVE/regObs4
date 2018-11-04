import { Component, OnInit, ChangeDetectorRef, ApplicationRef } from '@angular/core';
import { BasePage } from '../../base.page';
import { RegistrationTid } from '../../../models/registrationTid.enum';
import { RegistrationService } from '../../../services/registration.service';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-landslide-obs',
  templateUrl: './landslide-obs.page.html',
  styleUrls: ['./landslide-obs.page.scss'],
})
export class LandslideObsPage extends BasePage {

  constructor(
    registrationService: RegistrationService,
    actvatedRoute: ActivatedRoute,
    changeDetectorRef: ChangeDetectorRef,
    private modalController: ModalController,
  ) {
    super(RegistrationTid.LandSlideObs, registrationService, actvatedRoute, changeDetectorRef);
  }

  onReset() {
    this.changeDetectorRef.detectChanges();
  }

  updateUi() {
    this.changeDetectorRef.detectChanges();
  }

}
