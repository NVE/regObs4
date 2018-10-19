import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ObsLocationPage } from './obs-location.page';
import { SharedModule } from '../../../shared/shared.module';
import { MapModule } from '../../../map/map.module';

const routes: Routes = [
  {
    path: '',
    component: ObsLocationPage
  }
];

@NgModule({
  imports: [
    SharedModule,
    MapModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ObsLocationPage]
})
export class ObsLocationPageModule { }
