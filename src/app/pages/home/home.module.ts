import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { HomePage } from './home.page';
import { TranslateModule } from '@ngx-translate/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { GeoSelectComponent } from '../../components/geo-select/geo-select.component';
import { MapItemBarComponent } from '../../components/map-item-bar/map-item-bar.component';
import { MapControlsComponent } from '../../components/map-controls/map-controls.component';
import { MapSearchComponent } from '../../components/map-controls/map-search/map-search.component';
import { FullscreenToggleComponent } from '../../components/map-controls/fullscreen-toggle/fullscreen-toggle.component';
import { GpsCenterComponent } from '../../components/map-controls/gps-center/gps-center.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { AddMenuComponent } from '../../components/add-menu/add-menu.component';

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
    AngularSvgIconModule,
  ],
  declarations: [
    HomePage,
    GeoSelectComponent,
    MapItemBarComponent,
    MapControlsComponent,
    MapSearchComponent,
    FullscreenToggleComponent,
    GpsCenterComponent,
    AddMenuComponent,
  ],
})
export class HomePageModule {
}
