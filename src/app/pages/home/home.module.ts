import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomePage } from './home.page';
import { MapItemBarComponent } from '../../components/map-item-bar/map-item-bar.component';
import { SharedModule } from '../../modules/shared/shared.module';
import { MapModule } from '../../modules/map/map.module';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: HomePage,
      },
    ]),
    SharedModule,
    MapModule,
    HomePage,
    MapItemBarComponent,
  ],
})
export class HomePageModule {}
