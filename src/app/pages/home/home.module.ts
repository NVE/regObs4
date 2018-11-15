import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { HomePage } from './home.page';
import { TranslateModule } from '@ngx-translate/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MapItemBarComponent } from '../../components/map-item-bar/map-item-bar.component';
import { SharedModule } from '../../modules/shared/shared.module';
import { DataLoadModule } from '../../modules/data-load/data-load.module';
import { MapModule } from '../../modules/map/map.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage,
      }
    ]),
    TranslateModule,
    LeafletModule,
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
