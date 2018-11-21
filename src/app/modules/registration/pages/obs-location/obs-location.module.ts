import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ObsLocationPage } from './obs-location.page';
import { SharedComponentsModule } from '../../shared-components.module';
import { LoginGuard } from '../../../../core/guards/login.guard';

const routes: Routes = [
  {
    path: '',
    component: ObsLocationPage,
    canActivate: [LoginGuard],
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
