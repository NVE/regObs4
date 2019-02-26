import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPage } from './login.page';
import { SharedModule } from '../../../shared/shared.module';
import { SharedLoginComponentsModule } from '../../shared-login-components.module';

const routes: Routes = [
  {
    path: '',
    component: LoginPage
  }
];

@NgModule({
  imports: [
    SharedLoginComponentsModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LoginPage]
})
export class LoginPageModule { }
