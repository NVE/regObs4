import { NgModule, forwardRef, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationRoutingModule } from './registration-routing.module';
import { RegobsApiModule } from '../regobs-api/regobs-api.module';
import { ApiInterceptor } from '../../core/http-interceptor/ApiInterceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    RegistrationRoutingModule,
    RegobsApiModule,
  ],
  declarations: []
})
export class RegistrationModule { }
