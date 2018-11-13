import { Component, OnInit, Input } from '@angular/core';
import { GeoHazard } from '../../core/models/geo-hazard.enum';

@Component({
  selector: 'app-geo-icon',
  templateUrl: './geo-icon.component.html',
  styleUrls: ['./geo-icon.component.scss']
})

export class GeoIconComponent implements OnInit {
  constructor() { }

  @Input() geoHazard: GeoHazard;
  @Input() size: number;

  get width() {
    return this.getDimensions().width * (this.size || 1.0);
  }

  get height() {
    return this.getDimensions().height * (this.size || 1.0);
  }

  get geoClass() {
    if (this.geoHazard) {
      return (<string>GeoHazard[this.geoHazard]).toLowerCase();
    }
    return '';
  }

  getDimensions() {
    switch (this.geoHazard) {
      case GeoHazard.Avalanche:
        return { width: 22, height: 24.2 };
      case GeoHazard.LandSlide:
        return { width: 22, height: 24 };
      case GeoHazard.Flooding:
        return { width: 33, height: 30.8 };
      case GeoHazard.Ice:
        return { width: 22, height: 28 };
      default:
        return { width: 22, height: 22 };
    }
  }

  getBaseHeight() {
    switch (this.geoHazard) {
      case GeoHazard.Avalanche:
        return 22;
      case GeoHazard.LandSlide:
        return 22;
      case GeoHazard.Flooding:
        return 33;
      case GeoHazard.Ice:
        return 24.2;
      default:
        return 18;
    }
  }

  get options() {
    return {
      'width.px': this.width,
      'height.px': this.height
    };
  }

  get iconSrc() {
    return `/assets/icon/${GeoHazard[this.geoHazard].toLowerCase()}.svg`;
  }

  ngOnInit() {
  }

}
