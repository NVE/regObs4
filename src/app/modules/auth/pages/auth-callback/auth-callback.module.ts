import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuthCallbackPageRoutingModule } from './auth-callback-routing.module';

import { AuthCallbackPage } from './auth-callback.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuthCallbackPageRoutingModule
  ],
  declarations: [AuthCallbackPage]
})
export class AuthCallbackPageModule {}
