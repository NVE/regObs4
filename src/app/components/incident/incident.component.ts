import { Component, Input } from '@angular/core';
import { IncidentEditModel, RegistrationEditModel } from '../../modules/common-regobs-api';
import { GeoHazard } from '../../modules/common-core/models/geo-hazard.enum';

export enum IncidentType {
  Snow = 'SNOW.AVALANCHE_OBS',
  IceIncident = 'ICE.INCIDENT',
  IceProblem = 'ICE.PROBLEM',
}

@Component({
  selector: 'app-incident-component',
  templateUrl: './incident.component.html',
  styleUrls: ['./incident.component.scss']
})
export class IncidentComponent {
  @Input() incident: IncidentEditModel;
  @Input() geoHazard: GeoHazard;
  @Input() incidentType: 'Snow' | 'IceIncident' | 'IceProblem';
  @Input() registration: RegistrationEditModel;

  get incidentTypeName(): string {
    return IncidentType[this.incidentType];
  }

  get geoHazardName(): string {
    return GeoHazard[this.geoHazard];
  }

}
