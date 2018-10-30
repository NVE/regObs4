import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyObservationsPage } from './my-observations.page';
import { SharedModule } from '../../modules/shared/shared.module';
import { SharedComponentsModule } from '../../modules/registration/shared-components.module';

const routes: Routes = [
  {
    path: '',
    component: MyObservationsPage
  }
];

@NgModule({
  imports: [
    SharedModule,
    SharedComponentsModule,
    RouterModule.forChild(routes),
  ],
  declarations: [MyObservationsPage]
})
export class MyObservationsPageModule { }
