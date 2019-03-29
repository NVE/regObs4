import { NgModule } from '@angular/core';
import { MapComponent } from './components/map/map.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MapControlsComponent } from './components/map-controls/map-controls.component';
import { MapSearchComponent } from './components/map-controls/map-search/map-search.component';
import { FullscreenToggleComponent } from './components/map-controls/fullscreen-toggle/fullscreen-toggle.component';
import { GpsCenterComponent } from './components/map-controls/gps-center/gps-center.component';
import { MapCenterInfoComponent } from './components/map-center-info/map-center-info.component';
import { SharedModule } from '../shared/shared.module';
import { ModalSearchPageModule } from './pages/modal-search/modal-search.module';
import { LeafletEdgeBufferModule } from 'ngx-leaflet-edgebuffer';

@NgModule({
  imports: [
    SharedModule,
    LeafletModule,
    LeafletEdgeBufferModule,
    ModalSearchPageModule,
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
    ModalSearchPageModule
  ]
})
export class MapModule { }
