import { Component, Input } from '@angular/core';
import { GeoHazard } from 'src/app/modules/common-core/models';

@Component({
  selector: 'app-geo-icon',
  templateUrl: './geo-icon.component.html',
  styleUrls: ['./geo-icon.component.scss']
})
export class GeoIconComponent {

  @Input() geoHazards: GeoHazard[];
  @Input() useGeoColors = true;

  get geoClass() {
    if (this.geoHazards && this.geoHazards.length > 0) {
      return this.geoHazards
        .map((geoHazard) => geoHazard !== GeoHazard.Soil ? (<string>GeoHazard[geoHazard]).toLowerCase() : 'dirt')
        .join('-');
    }
    return '';
  }

  get iconSrc() {
    return `/assets/icon/${this.geoClass.replace(/-/, '_')}.svg`;
  }
}
