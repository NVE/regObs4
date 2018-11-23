import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SetTimePage } from './set-time.page';
import { SharedModule } from '../../../shared/shared.module';


const routes: Routes = [
  {
    path: '',
    component: SetTimePage,
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SetTimePage]
})
export class SetTimePageModule { }
