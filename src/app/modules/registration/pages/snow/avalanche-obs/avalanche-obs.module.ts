import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AvalancheObsPage } from './avalanche-obs.page';
import { SharedComponentsModule } from '../../../shared-components.module';
import { canDeactivateBasePageComponent } from '../../can-deactivate-route.guard';
import { AddWebUrlModalPageModule } from '../../add-web-url-modal/add-web-url-modal.module';
import { SetAvalanchePositionPageModule } from '../../set-avalanche-position/set-avalanche-position.module';

const routes: Routes = [
  {
    path: '',
    component: AvalancheObsPage,
    canDeactivate: [canDeactivateBasePageComponent],
  },
];

@NgModule({
  imports: [
    SharedComponentsModule,
    AddWebUrlModalPageModule,
    SetAvalanchePositionPageModule,
    RouterModule.forChild(routes),
    AvalancheObsPage,
  ],
})
export class AvalancheObsPageModule {}
