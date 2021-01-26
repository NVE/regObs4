import { NgModule } from '@angular/core';
import { MapComponent } from './components/map/map.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MapControlsComponent } from './components/map-controls/map-controls.component';
import { MapSearchComponent } from './components/map-controls/map-search/map-search.component';
import { FullscreenToggleComponent } from './components/map-controls/fullscreen-toggle/fullscreen-toggle.component';
import { GpsCenterComponent } from './components/map-controls/gps-center/gps-center.component';
import { MapCenterInfoComponent } from './components/map-center-info/map-center-info.component';
import { ModalSearchPageModule } from './pages/modal-search/modal-search.module';
import { LeafletEdgeBufferModule } from 'ngx-leaflet-edgebuffer';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { ModalMapImagePageModule } from './pages/modal-map-image/modal-map-image.module';
import { SupportMapInfoPageModule } from './pages/support-map-info/support-map-info.module';
import { MapImageModule } from '../map-image/map-image.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AngularSvgIconModule,
    TranslateModule,
    RouterModule,
    LeafletModule,
    LeafletEdgeBufferModule,
    ModalSearchPageModule,
    ModalMapImagePageModule,
    SupportMapInfoPageModule,
    MapImageModule
  ],
  declarations: [
    MapComponent,
    MapControlsComponent,
    MapSearchComponent,
    FullscreenToggleComponent,
    GpsCenterComponent,
    MapCenterInfoComponent
  ],
  exports: [
    MapComponent,
    MapControlsComponent,
    MapSearchComponent,
    FullscreenToggleComponent,
    GpsCenterComponent,
    MapCenterInfoComponent,
    ModalSearchPageModule,
    ModalMapImagePageModule,
    SupportMapInfoPageModule
  ]
})
export class MapModule {}
