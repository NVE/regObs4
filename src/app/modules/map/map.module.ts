import { NgModule } from '@angular/core';
import { MapComponent } from './components/map/map.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MapControlsComponent } from './components/map-controls/map-controls.component';
import { MapSearchComponent } from './components/map-controls/map-search/map-search.component';
import { FullscreenToggleComponent } from './components/map-controls/fullscreen-toggle/fullscreen-toggle.component';
import { GpsCenterComponent } from './components/map-controls/gps-center/gps-center.component';
import { MapCenterInfoComponent } from './components/map-center-info/map-center-info.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { SupportMapInfoPageModule } from './pages/support-map-info/support-map-info.module';
import { SharedModule } from '../shared/shared.module';
import { MapZoomComponent } from './components/map-controls/map-zoom/map-zoom.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularSvgIconModule,
    TranslateModule,
    RouterModule,
    LeafletModule,
    SupportMapInfoPageModule,
    SharedModule,
    MapComponent,
    MapControlsComponent,
    MapSearchComponent,
    FullscreenToggleComponent,
    GpsCenterComponent,
    MapCenterInfoComponent,
    MapZoomComponent,
  ],
  exports: [
    MapComponent,
    MapControlsComponent,
    MapSearchComponent,
    FullscreenToggleComponent,
    GpsCenterComponent,
    MapCenterInfoComponent,
    MapZoomComponent,
    SupportMapInfoPageModule,
  ],
})
export class MapModule {}
