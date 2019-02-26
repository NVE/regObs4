import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SnowSurfacePage } from './snow-surface.page';
import { SharedComponentsModule } from '../../../shared-components.module';

const routes: Routes = [
  {
    path: '',
    component: SnowSurfacePage
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
