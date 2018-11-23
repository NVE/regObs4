import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ObsLocationPage } from './obs-location.page';
import { SharedComponentsModule } from '../../shared-components.module';

const routes: Routes = [
  {
    path: '',
    component: ObsLocationPage,
  }
];

@NgModule({
  imports: [
    SharedComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ObsLocationPage]
})
export class ObsLocationPageModule { }
