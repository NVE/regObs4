import { NgModule } from '@angular/core';
import { MapComponent } from './components/map/map.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MapControlsComponent } from './components/map-controls/map-controls.component';
import { MapSearchComponent } from './components/map-controls/map-search/map-search.component';
import { FullscreenToggleComponent } from './components/map-controls/fullscreen-toggle/fullscreen-toggle.component';
import { GpsCenterComponent } from './components/map-controls/gps-center/gps-center.component';
import { MapCenterInfoComponent } from './components/map-center-info/map-center-info.component';
import { SharedModule } from '../shared/shared.module';
import { ModalSearchPage } from './pages/modal-search/modal-search.page';
import { StartsWithHighlightPipe } from '../../core/pipes/starts-with-highlight.pipe';

@NgModule({
  imports: [
    SharedModule,
    LeafletModule,
  ],
  declarations: [
    MapComponent,
    MapControlsComponent,
    MapSearchComponent,
    FullscreenToggleComponent,
    GpsCenterComponent,
    MapCenterInfoComponent,
    StartsWithHighlightPipe,
    ModalSearchPage,
  ],
  exports: [
    MapComponent,
    MapControlsComponent,
    MapSearchComponent,
    FullscreenToggleComponent,
    GpsCenterComponent,
    MapCenterInfoComponent,
    ModalSearchPage,
  ],
  entryComponents: [ModalSearchPage]
})
export class MapModule { }
