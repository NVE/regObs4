import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DangerObsPage } from './danger-obs.page';
import { SharedComponentsModule } from '../../shared-components.module';

const routes: Routes = [
  {
    path: '',
    component: DangerObsPage
  }
];

@NgModule({
  imports: [
    SharedComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DangerObsPage]
})
export class DangerObsPageModule { }
