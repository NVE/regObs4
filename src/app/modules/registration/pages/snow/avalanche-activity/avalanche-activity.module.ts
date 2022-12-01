import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AvalancheActivityPage } from './avalanche-activity.page';
import { SharedComponentsModule } from '../../../shared-components.module';
import { AvalancheActivityModalPageModule } from './avalanche-activity-modal/avalanche-activity-modal.module';

const routes: Routes = [
  {
    path: '',
    component: AvalancheActivityPage,
  },
];

@NgModule({
  imports: [SharedComponentsModule, AvalancheActivityModalPageModule, RouterModule.forChild(routes)],
  declarations: [AvalancheActivityPage],
})
export class AvalancheActivityPageModule {}
