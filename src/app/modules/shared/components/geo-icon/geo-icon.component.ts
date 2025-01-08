import { IonIcon } from '@ionic/angular/standalone';
import { Component, computed, input } from '@angular/core';
import { GeoHazard } from 'src/app/modules/common-core/models';
import { getGeohazardsId, getIconForGeohazards } from './get-geo-icon';

@Component({
  selector: 'app-geo-icon',
  templateUrl: './geo-icon.component.html',
  styleUrls: ['./geo-icon.component.scss'],
  imports: [IonIcon],
})
export class GeoIconComponent {
  readonly geoHazards = input.required<GeoHazard[]>();
  readonly useGeoColors = input(true);

  geoClass = computed(() => {
    const geoHazards = this.geoHazards();
    return getGeohazardsId(geoHazards);
  });

  classes = computed(() => {
    const classes = [];
    if (this.useGeoColors()) {
      classes.push('geo-color');
    }
    const geoClass = this.geoClass();
    if (geoClass) {
      classes.push(geoClass);
    }
    return classes;
  });

  iconSrc = computed(() => getIconForGeohazards(this.geoHazards()));
}
