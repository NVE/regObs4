import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedComponentsModule } from '../../../shared-components.module';
import { LandslideObsPage } from './landslide-obs.page';

const routes: Routes = [
  {
    path: '',
    component: LandslideObsPage
  }
];

@NgModule({
  imports: [
    SharedComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LandslideObsPage]
})
export class LandslideObsPageModule { }
