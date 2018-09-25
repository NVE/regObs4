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
      case GeoHazard.Snow:
        return { width: 22, height: 24.2 };
      case GeoHazard.Dirt:
        return { width: 22, height: 24 };
      case GeoHazard.Water:
        return { width: 33, height: 30.8 };
      case GeoHazard.Ice:
        return { width: 22, height: 28 };
      default:
        return { width: 22, height: 22 };
    }
  }

  getBaseHeight() {
    switch (this.geoHazard) {
      case GeoHazard.Snow:
        return 22;
      case GeoHazard.Dirt:
        return 22;
      case GeoHazard.Water:
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
    switch (this.geoHazard) {
      case GeoHazard.Snow:
        return '/assets/icon/snow.svg';
      case GeoHazard.Dirt:
        return '/assets/icon/dirt.svg';
      case GeoHazard.Water:
        return '/assets/icon/water.svg';
      case GeoHazard.Ice:
        return '/assets/icon/ice.svg';
      default:
        return '';
    }
  }
  ngOnInit() {
  }

}
