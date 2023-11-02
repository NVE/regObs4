import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ObskorpsPage } from './obskorps.page';

const routes: Routes = [
  {
    path: '',
    component: ObskorpsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ObskorpsPageRoutingModule {}
