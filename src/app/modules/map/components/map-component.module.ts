import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { FullscreenToggleComponent } from './map-controls/fullscreen-toggle/fullscreen-toggle.component';
import { GpsCenterComponent } from './map-controls/gps-center/gps-center.component';
import { MapControlsComponent } from './map-controls/map-controls.component';
import { MapSearchComponent } from './map-controls/map-search/map-search.component';
import { MapImageComponent } from './map-image/map-image.component';
import { MapComponent } from './map/map.component';
@NgModule({
  imports: [CommonModule, AngularSvgIconModule, IonicModule],
  declarations: [
    MapComponent,
    MapImageComponent,
    MapControlsComponent,
    FullscreenToggleComponent,
    GpsCenterComponent,
    MapSearchComponent
  ],
  exports: [
    MapComponent,
    MapImageComponent,
    MapControlsComponent,
    FullscreenToggleComponent,
    GpsCenterComponent,
    MapSearchComponent
  ]
})
export class MapComponentModule {}
