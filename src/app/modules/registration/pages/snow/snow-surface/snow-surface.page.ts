import { Component, OnInit } from '@angular/core';
import { BasePage } from '../../base.page';
import { BasePageService } from '../../base-page-service';
import { ActivatedRoute } from '@angular/router';
import { RegistrationTid } from '../../../models/registrationTid.enum';

@Component({
  selector: 'app-snow-surface',
  templateUrl: './snow-surface.page.html',
  styleUrls: ['./snow-surface.page.scss'],
})
export class SnowSurfacePage extends BasePage {

  constructor(
    basePageService: BasePageService,
    activatedRoute: ActivatedRoute,
  ) {
    super(RegistrationTid.SnowSurfaceObservation, basePageService, activatedRoute);
  }

  onInit() {
    if (this.registration.request.SnowSurfaceObservation.SnowDepth > 0) {
      this.registration.request.SnowSurfaceObservation.SnowDepth = this.registration.request.SnowSurfaceObservation.SnowDepth * 100.0;
    }
    if (this.registration.request.SnowSurfaceObservation.NewSnowDepth24 > 0) {
      this.registration.request.SnowSurfaceObservation.NewSnowDepth24
        = this.registration.request.SnowSurfaceObservation.NewSnowDepth24 * 100.0;
    }
  }

  onBeforeLeave() {
    if (this.registration.request.SnowSurfaceObservation.SnowDepth > 0) {
      this.registration.request.SnowSurfaceObservation.SnowDepth = this.registration.request.SnowSurfaceObservation.SnowDepth / 100.0;
    }
    if (this.registration.request.SnowSurfaceObservation.NewSnowDepth24 > 0) {
      this.registration.request.SnowSurfaceObservation.NewSnowDepth24
        = this.registration.request.SnowSurfaceObservation.NewSnowDepth24 / 100.0;
    }
  }
}


