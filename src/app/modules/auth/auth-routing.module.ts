import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'auth/callback', loadChildren: () => import('./pages/auth-callback/auth-callback.module').then(m => m.AuthCallbackPageModule) },
  // { path: 'auth/endsession', loadChildren: () => import('./pages/auth-callback/auth-callback.module').then(m => m.AuthCallbackPageModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
