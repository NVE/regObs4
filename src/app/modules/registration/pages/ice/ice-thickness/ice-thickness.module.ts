import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IceThicknessPage } from './ice-thickness.page';
import { SharedComponentsModule } from '../../../shared-components.module';
import { IceLayerPageModule } from './ice-layer/ice-layer.module';
import { CanDeactivateRouteGuard } from '../../can-deactivate-route.guard';

const routes: Routes = [
  {
    path: '',
    component: IceThicknessPage,
    canDeactivate: [CanDeactivateRouteGuard]
  }
];

@NgModule({
  imports: [
    SharedComponentsModule,
    IceLayerPageModule,
    RouterModule.forChild(routes)
  ],
  declarations: [IceThicknessPage]
})
export class IceThicknessPageModule {}
