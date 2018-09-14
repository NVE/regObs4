import { Component, OnInit, Input } from '@angular/core';
import { GeoHazard } from '../../core/models/geo-hazard.enum';

const scale = 0.789444;

@Component({
  selector: 'app-geo-icon',
  templateUrl: './geo-icon.component.html',
  styleUrls: ['./geo-icon.component.scss']
})

export class GeoIconComponent implements OnInit {

  constructor() { }

  @Input() geoHazard: GeoHazard;
  @Input() size: number;
  @Input() color: string;

  get width() {
    return (18.0 * (this.size || 1.0) * scale);
  }

  get height() {
    return (18.0 * (this.size || 1.0));
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

  options: {
  };

  ngOnInit() {
    this.options = {
      'width.px': this.width,
      'height.px': this.height,
      'fill': '#000'
    };
  }

}
