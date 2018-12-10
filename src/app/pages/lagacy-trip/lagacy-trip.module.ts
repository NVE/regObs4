import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LagacyTripPage } from './lagacy-trip.page';
import { SharedModule } from '../../modules/shared/shared.module';
import { SharedComponentsModule } from '../../modules/registration/shared-components.module';

const routes: Routes = [
  {
    path: '',
    component: LagacyTripPage
  }
];

@NgModule({
  imports: [
    SharedModule,
    SharedComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LagacyTripPage]
})
export class LagacyTripPageModule { }
