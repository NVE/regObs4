import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomePage } from './home.page';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MapItemBarComponent } from '../../components/map-item-bar/map-item-bar.component';
import { SharedModule } from '../../modules/shared/shared.module';
import { DataLoadModule } from '../../modules/data-load/data-load.module';
import { MapModule } from '../../modules/map/map.module';
import { LegalTermsModalPageModule } from '../modal-pages/legal-terms-modal/legal-terms-modal.module';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: HomePage,
      }
    ]),
    SharedModule,
    DataLoadModule,
    MapModule,
  ],
  declarations: [
    HomePage,
    MapItemBarComponent,
  ],
})
export class HomePageModule {
}
