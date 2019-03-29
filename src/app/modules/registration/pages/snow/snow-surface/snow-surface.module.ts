import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SnowSurfacePage } from './snow-surface.page';
import { SharedComponentsModule } from '../../../shared-components.module';
import { CanDeactivateRouteGuard } from '../../can-deactivate-route.guard';

const routes: Routes = [
  {
    path: '',
    component: SnowSurfacePage,
    canDeactivate: [CanDeactivateRouteGuard],
  }
];

@NgModule({
  imports: [
    SharedComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SnowSurfacePage]
})
export class SnowSurfacePageModule { }
