import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewObservationPage } from './view-observation.page';
import { SharedModule } from '../../modules/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: ViewObservationPage,
  },
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes), ViewObservationPage],
})
export class ViewObservationPageModule {}
