import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthCallbackPageRoutingModule } from './auth-callback-routing.module';

import { AuthCallbackPage } from './auth-callback.page';

@NgModule({
  imports: [CommonModule, FormsModule, AuthCallbackPageRoutingModule, AuthCallbackPage],
})
export class AuthCallbackPageModule {}
