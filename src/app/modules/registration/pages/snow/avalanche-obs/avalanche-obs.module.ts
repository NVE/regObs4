import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AvalancheObsPage } from './avalanche-obs.page';
import { SharedComponentsModule } from '../../../shared-components.module';
import { CanDeactivateRouteGuard } from '../../can-deactivate-route.guard';

const routes: Routes = [
  {
    path: '',
    component: AvalancheObsPage,
    canDeactivate: [CanDeactivateRouteGuard],
  }
];

@NgModule({
  imports: [
    SharedComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AvalancheObsPage]
})
export class AvalancheObsPageModule { }
