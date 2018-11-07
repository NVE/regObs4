import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AvalancheActivityPage } from './avalanche-activity.page';
import { SharedComponentsModule } from '../../../shared-components.module';

const routes: Routes = [
  {
    path: '',
    component: AvalancheActivityPage
  }
];

@NgModule({
  imports: [
    SharedComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AvalancheActivityPage]
})
export class AvalancheActivityPageModule { }
