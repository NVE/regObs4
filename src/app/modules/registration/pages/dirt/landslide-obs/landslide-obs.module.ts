import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedComponentsModule } from '../../../shared-components.module';
import { LandslideObsPage } from './landslide-obs.page';
import { CanDeactivateRouteGuard } from '../../can-deactivate-route.guard';

const routes: Routes = [
  {
    path: '',
    component: LandslideObsPage,
    canDeactivate: [CanDeactivateRouteGuard],
  }
];

@NgModule({
  imports: [
    SharedComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LandslideObsPage]
})
export class LandslideObsPageModule { }
