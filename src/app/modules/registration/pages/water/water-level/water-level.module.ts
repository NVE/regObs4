import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WaterLevelPage } from './water-level.page';
import { SharedComponentsModule } from '../../../shared-components.module';

const routes: Routes = [
  {
    path: '',
    component: WaterLevelPage
  }
];

@NgModule({
  imports: [
    SharedComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [WaterLevelPage]
})
export class WaterLevelPageModule { }
