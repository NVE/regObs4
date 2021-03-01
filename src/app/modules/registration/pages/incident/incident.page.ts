import { Component } from '@angular/core';
import { BasePage } from '../base.page';
import { BasePageService } from '../base-page-service';
import { ActivatedRoute } from '@angular/router';
import { RegistrationTid } from '@varsom-regobs-common/registration';
import { GeoHazard } from '@varsom-regobs-common/core';

@Component({
  selector: 'app-incident',
  templateUrl: './incident.page.html',
  styleUrls: ['./incident.page.scss']
})
export class IncidentPage extends BasePage {
  get geoHazardName() {
    return GeoHazard[this.registration.geoHazard];
  }

  constructor(
    basePageService: BasePageService,
    activatedRoute: ActivatedRoute
  ) {
    super(RegistrationTid.Incident, basePageService, activatedRoute);
  }
}
