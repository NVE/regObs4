import { Component, OnInit, Input } from '@angular/core';
import { GeoHazard } from '../../../../core/models/geo-hazard.enum';

@Component({
  selector: 'app-geo-name',
  templateUrl: './geo-name.component.html',
  styleUrls: ['./geo-name.component.scss']
})
export class GeoNameComponent implements OnInit {

  @Input() geoHazards: GeoHazard[];

  get translateKeys() {
    if (this.geoHazards && this.geoHazards.length > 0) {
      return this.geoHazards.map((geoHazard) => `GEO_HAZARDS.${GeoHazard[geoHazard]}`.toUpperCase());
    }
    return '';
  }

  constructor() { }

  ngOnInit() {
  }
}
