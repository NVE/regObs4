import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SetTimePage } from './set-time.page';
import { SharedModule } from '../../../shared/shared.module';
import { CanDeactivateToObsLocationRouteGuard } from './can-deactivate-to-obs-location.guard';

const routes: Routes = [
  {
    path: '',
    component: SetTimePage,
    canDeactivate: [CanDeactivateToObsLocationRouteGuard]
  }
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [SetTimePage],
  providers: [CanDeactivateToObsLocationRouteGuard]
})
export class SetTimePageModule {}
