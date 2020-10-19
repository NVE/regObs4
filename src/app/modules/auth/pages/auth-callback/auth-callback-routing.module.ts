import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthCallbackPage } from './auth-callback.page';

const routes: Routes = [
  {
    path: '',
    component: AuthCallbackPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthCallbackPageRoutingModule {}
