import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { LeafletEdgeBufferModule } from 'ngx-leaflet-edgebuffer';
import { MapCenterInfoComponent } from './components/map-center-info/map-center-info.component';
import { FullscreenToggleComponent } from './components/map-controls/fullscreen-toggle/fullscreen-toggle.component';
import { GpsCenterComponent } from './components/map-controls/gps-center/gps-center.component';
import { MapControlsComponent } from './components/map-controls/map-controls.component';
import { MapSearchComponent } from './components/map-controls/map-search/map-search.component';
import { MapImageComponent } from './components/map-image/map-image.component';
import { MapImageModule } from './components/map-image/map-image.module';
import { MapComponentModule } from './components/map-component.module';
import { ModalMapImagePageModule } from './pages/modal-map-image/modal-map-image.module';
import { ModalSearchPageModule } from './pages/modal-search/modal-search.module';
import { SupportMapInfoPageModule } from './pages/support-map-info/support-map-info.module';
import { MapControlsModule } from './components/map-controls/map-controls.module';

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
    MapComponentModule,
    ModalMapImagePageModule,
    SupportMapInfoPageModule,
    MapImageModule
  ],
  declarations: [MapCenterInfoComponent],
  exports: [
    MapComponentModule,
    MapImageModule,
    MapControlsModule,
    MapCenterInfoComponent,
    ModalSearchPageModule,
    ModalMapImagePageModule,
    SupportMapInfoPageModule
  ]
})
export class MapModule {}
