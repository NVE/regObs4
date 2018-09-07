import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { HomePage } from './home.page';
import { TranslateModule } from '@ngx-translate/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { GeoSelectComponent } from '../../components/geo-select/geo-select.component';
import { FullscreenToggleComponent } from '../../components/fullscreen-toggle/fullscreen-toggle.component';
import { MapSearchComponent } from '../../components/map-search/map-search.component';
import { MapItemBarComponent } from '../../components/map-item-bar/map-item-bar.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ]),
    TranslateModule,
    LeafletModule,
  ],
  declarations: [HomePage, GeoSelectComponent, FullscreenToggleComponent, MapSearchComponent, MapItemBarComponent],
})
export class HomePageModule {
}
