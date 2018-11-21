import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SetTimePage } from './set-time.page';
import { SharedModule } from '../../../shared/shared.module';
import { LoginGuard } from '../../../../core/guards/login.guard';


const routes: Routes = [
  {
    path: '',
    component: SetTimePage,
    canActivate: [LoginGuard],
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
