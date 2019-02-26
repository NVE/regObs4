import { Component, OnInit, Input } from '@angular/core';
import { GeoHazard } from '../../core/models/geo-hazard.enum';

@Component({
  selector: 'app-geo-icon',
  templateUrl: './geo-icon.component.html',
  styleUrls: ['./geo-icon.component.scss']
})

export class GeoIconComponent implements OnInit {
  constructor() { }

  @Input() geoHazards: GeoHazard[];
  @Input() size: number;

  get width() {
    return this.getDimensions().width * (this.size || 1.0);
  }

  get height() {
    return this.getDimensions().height * (this.size || 1.0);
  }

  get geoClass() {
    if (this.geoHazards && this.geoHazards.length > 0) {
      return this.geoHazards.map((geoHazard) => (<string>GeoHazard[geoHazard]).toLowerCase()).join('_');
    }
    return '';
  }

  getDimensions() {
    if (this.geoHazards.length > 1) {
      return { width: 35, height: 35 };
    } else {
      switch (this.geoHazards[0]) {
        case GeoHazard.Snow:
          return { width: 22, height: 24.2 };
        case GeoHazard.Dirt:
          return { width: 35, height: 35 };
        case GeoHazard.Water:
          return { width: 33, height: 30.8 };
        case GeoHazard.Ice:
          return { width: 22, height: 28 };
        default:
          return { width: 33, height: 33 };
      }
    }
  }

  // getBaseHeight() {
  //   switch (this.geoHazards[0]) {
  //     case GeoHazard.Snow:
  //       return 22;
  //     case GeoHazard.Dirt:
  //       return 22;
  //     case GeoHazard.Water:
  //       return 33;
  //     case GeoHazard.Ice:
  //       return 24.2;
  //     default:
  //       return 18;
  //   }
  // }

  get options() {
    return {
      'width.px': this.width,
      'height.px': this.height
    };
  }

  get iconSrc() {
    return `/assets/icon/${this.geoClass}.svg`;
  }

  ngOnInit() {
  }

}
