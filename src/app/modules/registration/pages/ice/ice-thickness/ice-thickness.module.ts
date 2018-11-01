import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IceThicknessPage } from './ice-thickness.page';
import { SharedComponentsModule } from '../../../shared-components.module';

const routes: Routes = [
  {
    path: '',
    component: IceThicknessPage
  }
];

@NgModule({
  imports: [
    SharedComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [IceThicknessPage]
})
export class IceThicknessPageModule { }
