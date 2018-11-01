import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RegistrationService } from '../../../services/registration.service';
import { ActivatedRoute } from '@angular/router';
import { RegistrationTid } from '../../../models/registrationTid.enum';
import { BasePage } from '../../base.page';

@Component({
  selector: 'app-ice-thickness',
  templateUrl: './ice-thickness.page.html',
  styleUrls: ['./ice-thickness.page.scss'],
})

export class IceThicknessPage extends BasePage {
  minSnowDepth = 0;
  maxSnowDepth = 10000;

  constructor(
    registrationService: RegistrationService,
    actvatedRoute: ActivatedRoute,
    changeDetectorRef: ChangeDetectorRef,
  ) {
    super(RegistrationTid.IceThickness, registrationService, actvatedRoute, changeDetectorRef);
  }

  onSnowDepthChange(val: number) {
    if (val < this.minSnowDepth) {
      val = this.minSnowDepth;
    }
    this.changeDetectorRef.detectChanges();
  }

  addThicknessLayer() {

  }
}
