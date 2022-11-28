import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedComponentsModule } from '../../../shared-components.module';
import { LandslideObsPage } from './landslide-obs.page';
import { CanDeactivateRouteGuard } from '../../can-deactivate-route.guard';
import { AddWebUrlModalPageModule } from '../../add-web-url-modal/add-web-url-modal.module';
import { SetAvalanchePositionPageModule } from '../../set-avalanche-position/set-avalanche-position.module';

const routes: Routes = [
  {
    path: '',
    component: LandslideObsPage,
    canDeactivate: [CanDeactivateRouteGuard]
  }
];

@NgModule({
  imports: [
    SharedComponentsModule,
    AddWebUrlModalPageModule,
    SetAvalanchePositionPageModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LandslideObsPage]
})
export class LandslideObsPageModule {}
