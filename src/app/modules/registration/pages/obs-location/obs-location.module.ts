import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ObsLocationPage } from './obs-location.page';
import { SharedComponentsModule } from '../../shared-components.module';
import { SaveAsDraftRouteGuard } from '../save-as-draft.guard';
import { DatePipe } from '@angular/common';

const routes: Routes = [
  {
    path: '',
    component: ObsLocationPage,
    canDeactivate: [SaveAsDraftRouteGuard],
  },
];

@NgModule({
  imports: [SharedComponentsModule, RouterModule.forChild(routes)],
  declarations: [ObsLocationPage],
  providers: [DatePipe],
})
export class ObsLocationPageModule {}
