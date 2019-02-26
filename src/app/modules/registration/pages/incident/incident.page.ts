import { Component, OnInit } from '@angular/core';
import { BasePage } from '../base.page';
import { BasePageService } from '../base-page-service';
import { ActivatedRoute } from '@angular/router';
import { RegistrationTid } from '../../models/registrationTid.enum';
import { GeoHazard } from '../../../../core/models/geo-hazard.enum';

@Component({
  selector: 'app-incident',
  templateUrl: './incident.page.html',
  styleUrls: ['./incident.page.scss'],
})
export class IncidentPage extends BasePage {

  get geoHazardName() {
    return GeoHazard[this.registration.geoHazard];
  }

  constructor(
    basePageService: BasePageService,
    activatedRoute: ActivatedRoute,
  ) {
    super(RegistrationTid.Incident, basePageService, activatedRoute);
  }

}
