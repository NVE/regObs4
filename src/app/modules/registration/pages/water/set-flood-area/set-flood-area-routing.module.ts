import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SetFloodAreaPage } from './set-flood-area.page';

const routes: Routes = [
  {
    path: '',
    component: SetFloodAreaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SetFloodAreaPageRoutingModule {}
