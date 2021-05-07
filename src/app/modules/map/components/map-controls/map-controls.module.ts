import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { FullscreenToggleComponent } from './fullscreen-toggle/fullscreen-toggle.component';
import { GpsCenterComponent } from './gps-center/gps-center.component';
import { MapControlsComponent } from './map-controls.component';
import { MapSearchComponent } from './map-search/map-search.component';

@NgModule({
  imports: [CommonModule, AngularSvgIconModule, IonicModule],
  declarations: [
    MapControlsComponent,
    FullscreenToggleComponent,
    GpsCenterComponent,
    MapSearchComponent
  ],
  exports: [
    MapControlsComponent,
    FullscreenToggleComponent,
    GpsCenterComponent,
    MapSearchComponent
  ]
})
export class MapControlsModule {}
