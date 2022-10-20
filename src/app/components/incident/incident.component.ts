import { Component, Input } from '@angular/core';
import { IncidentEditModel } from '../../modules/common-regobs-api';
import { GeoHazard } from '../../modules/common-core/models/geo-hazard.enum';

@Component({
  selector: 'app-incident-component',
  templateUrl: './incident.component.html',
  styleUrls: ['./incident.component.scss']
})
export class IncidentComponent {
  @Input() incident: IncidentEditModel;
  @Input() geoHazard: GeoHazard;

  get geoHazardName(): string {
    return GeoHazard[this.geoHazard];
  }

}
