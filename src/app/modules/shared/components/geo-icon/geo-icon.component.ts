import { Component, OnInit, Input } from '@angular/core';
import { GeoHazard } from '@varsom-regobs-common/core';

@Component({
  selector: 'app-geo-icon',
  templateUrl: './geo-icon.component.html',
  styleUrls: ['./geo-icon.component.scss']
})
export class GeoIconComponent implements OnInit {
  constructor() {}

  @Input() geoHazards: GeoHazard[];
  @Input() useGeoColors = true;

  get geoClass() {
    if (this.geoHazards && this.geoHazards.length > 0) {
      return this.geoHazards
        .map((geoHazard) => (<string>GeoHazard[geoHazard]).toLowerCase())
        .join('-');
    }
    return '';
  }

  get iconSrc() {
    return `/assets/icon/${this.geoClass.replace(/-/, '_')}.svg`;
  }

  ngOnInit() {}
}
