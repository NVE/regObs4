import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DangerObsPage } from './danger-obs.page';
import { SharedComponentsModule } from '../../shared-components.module';
import { AddOrEditDangerObsModalPageModule } from './add-or-edit-danger-obs-modal/add-or-edit-danger-obs-modal.module';

const routes: Routes = [
  {
    path: '',
    component: DangerObsPage
  }
];

@NgModule({
  imports: [
    SharedComponentsModule,
    AddOrEditDangerObsModalPageModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DangerObsPage]
})
export class DangerObsPageModule {}
